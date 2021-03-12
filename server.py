"""Server for Bookworm app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify, json
from model import connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = "BD647hgfyetEHU789hfehd9svsru5HwgYkghjwrfishvs"

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def show_homepage(path):
    """Show the homepage"""

    return render_template("index.html")


@app.route("/users", methods=["GET","POST"])
def create_new_user():
    """Create a new user or get info about existing user."""

    if request.method == "GET":
        if session.get("user"):
            user_id = session["user"]
            user = crud.get_user_by_id(user_id)
            user = user.to_dict()
            print("USERUSERUSER", user)
            return jsonify (user)

    if request.method == "POST":
        first_name = request.json.get("first_name")
        last_name = request.json.get("last_name")
        email = request.json.get("email")
        password = request.json.get("password")
        city = request.json.get("city")
        state = request.json.get("state")

        if crud.get_user_by_email(email):
            return jsonify ({"error": f"An account with the email, {email}, already exists."})
            
        user = crud.create_user(first_name, last_name, email, password, city, state)
        first_category = crud.create_category(user.id, "My Favorite Books")
        # return jsonify ({'status': '200',
        #                 'message': 'Account has successfully been created'})
        return jsonify ({"user": user.to_dict()})


@app.route("/login", methods=["POST"])
def log_in_user():
    """Log a user in and show them they were successful or not."""
    
    email = request.json.get("email")
    password = request.json.get("password")

    user = crud.get_user_by_email(email.lower())

    if user:
            if user.check_password(password):
                session["user"] = user.id
                return jsonify ({"success": "Successfully logged in!",
                                "user_id": user.id,
                                "user_first_name": user.first_name})
            else:
                return jsonify ({"error": "Incorrect password. Please try again or create a new account."})
    else:
        return jsonify ({"error": "Sorry, but no account exists with that email."})


@app.route("/logout", methods=["POST"])
def log_out_user():
    """Log a user out and show them they were successful or not."""
  
    user_id = session.pop("user")
    # user = session.pop("user")
    user = crud.get_user_by_id(user_id)

    return jsonify ({"success": f"{user.first_name}, you have been successfully logged out! Come back soon, and happy reading!"})

@app.route("/categories", methods=["GET", "POST", "PUT", "DELETE"])
def get_and_update_categories():
    """Gets or updates a user's categories"""

    if session.get("user"):
        user_id = session["user"]

        if request.method == "GET":
            categories = []

            category_objects = crud.get_all_user_categories(session["user"])
            # category_objects = crud.get_all_user_categories(session["user"].id)

            for category_object in category_objects:

                dict_category = category_object.to_dict()
                categories.append(dict_category)

            return jsonify({"categories": categories})

        elif request.method == "POST":
            if request.json.get("label"):
                label = request.json.get("label")

                user = crud.get_user_by_id(user_id)
            
                if crud.get_category_by_label(user_id, label):
                    return ({"error": f"{label} is already in {user.first_name}'s bookshelf!"})

                new_category = crud.create_category(user_id, label)

                return jsonify ({"success": f"{new_category.label} has been added to {user.first_name}'s bookshelf!"})
            else:
                old_label = request.json.get("old_label")
                new_label = request.json.get("new_label")

                crud.update_category_label(user_id, old_label, new_label)

                return jsonify({"success": f"{old_label} has been changed to {new_label}!",
                                "label": new_label})

        elif request.method == "PUT":
            label = request.json.get("label")
            book_dict = request.json.get("book")
            isbn = book_dict["id"]
            book = crud.get_book_by_isbn(isbn)
            category = crud.get_category_by_label(user_id, label)
        
            if not book:
                print("This is the format of the authors", book_dict["volumeInfo"]["authors"])
                authors = ""
                for author in book_dict["volumeInfo"]["authors"]:
                    authors += f"{author} "
                page_count = book_dict["volumeInfo"].get("pageCount")
                if not page_count:
                    page_count = 000
                book = crud.create_book(isbn, 
                                        book_dict["volumeInfo"]["title"], 
                                        authors,
                                        book_dict["volumeInfo"]["description"], 
                                        page_count, 
                                        book_dict["volumeInfo"]["imageLinks"]["thumbnail"])

            if not category:
                category = crud.create_category(user_id, label)

                added_books = crud.create_book_category(book, category)
                return jsonify ({"success": f"""A new category, {category.label}, has been added to your bookshelf and {book.title} has been added to it"""})

            if book in crud.get_all_books_in_category(user_id, label):
                return jsonify ({"error": f"{book.title} is already in your {category.label} books"})

            added_books = crud.create_book_category(book, category)
            # Right now, added_books is a list of all of the book objects in category
        
            return jsonify ({"success": f"{book.title} has been added to {category.label} books"})
            # 'books_in_category': added_books

        elif request.method == "DELETE":
            if request.json.get("label"):
                label = request.json.get("label")
                crud.delete_category(label, user_id)

                return jsonify ({"success": f"{label} has successfully been removed from your bookshelf.",
                                "label": ""})

            else: 
                label = request.json.get("category")
                isbn = request.json.get("isbn")
                title = request.json.get("title")

                this_category = crud.get_category_by_label(user_id, label)

                crud.remove_book_from_category(isbn, this_category.id)

                return jsonify ({"success": f"{title} has successfully been removed from {label}.",})


@app.route("/user-data", methods=["GET", "POST"])
def get_user_data():
    """Returns user's categories and books within them"""

    if session.get("user"):
        user_id = session["user"]

        if request.method == "POST":
            new_first_name = request.json.get("newFirstName")
            new_last_name = request.json.get("newLastName")
            new_email = request.json.get("newEmail")
            new_city = request.json.get("newCity")
            new_state = request.json.get("newState")
            old_password = request.json.get("oldPassword")
            new_password = request.json.get("newPassword")

            crud.update_user_account(user_id, new_first_name, new_last_name, 
                                    new_email, new_city, new_state, 
                                    old_password, new_password)

            return jsonify ({"success": "Your account has successfully been updated"})

        if request.method == "GET":
            category_labels = crud.get_all_user_category_labels(user_id)
            # A list of the user's category names

            category_dict = {}
            book_list = []
            for category in category_labels:
                books = crud.get_all_books_in_category(user_id, category)
                for book in books:
                    book_list.append(book.to_dict())
                
                category_dict[category] = book_list
                book_list = []

            return jsonify (category_dict)

    else:
        return jsonify ({'error': 'User must be logged in to view this page.'})


#### EVENT ROUTES ####

@app.route("/new-event", methods=["POST"]) # PUT?
def create_new_event():
    """Creates a new event"""

    if session.get("user"):
        host_id = session["user"]
        city = request.json.get("city")
        state = request.json.get("state")
        eventDate = request.json.get("eventDate")
        startTime = request.json.get("startTime")
        endTime = request.json.get("endTime")

        # attendee = crud.get_user_by_id(host_id)
        new_event = crud.create_event(host_id, city, eventDate, startTime, endTime, state)
        crud.create_event_attendee(host_id, new_event.id)

        return jsonify ({"success": f"Your event has successfully been created for {eventDate} at {startTime}"})

    else:
        return jsonify ({"error": "There was an error creating this event."})


@app.route("/user-events") # GET
def get_user_events():
    """Returns user's events, hosting and attending"""

    if session.get("user"):
        user_id = session["user"]

        users_events = crud.get_all_events_for_user(user_id)
        # A list of the user's event objects
        print("USERS EVENTS **************", users_events)
        if users_events:
            users_events_dict = {"hosting": [], "attending": []}

            for event in users_events:
                events_books = crud.get_all_events_books(event.id)
                events_books = [event_book.to_dict() for event_book in events_books]
                books = crud.get_all_books_for_event(event.id) # CHANGED
                books = [book.to_dict() for book in books]

                host = crud.get_user_by_id(event.host_id)

                event = event.to_dict()
                event["books"] = books
                event["events_books"] = events_books
                event["host"] = f"{host.first_name} {host.last_name}"
        
                if event["host_id"] == user_id:
                    users_events_dict["hosting"].append(event)
                else:
                    users_events_dict["attending"].append(event)
            
            if len(users_events_dict["hosting"]) == 0:
                users_events_dict["hosting"] = None
            elif len(users_events_dict["attending"]) == 0:
                users_events_dict["attending"] = None

            return jsonify (users_events_dict)

        else:
            return jsonify ({})

    else:
        return jsonify ({'error': 'User must be logged in to view their events.'})


@app.route("/event-books", methods=["POST"]) # Right as POST
def update_event_books():
    """Updates the status of can_suggest_books and can_vote on an event"""

    if session.get("user"):
        event_id = request.json.get("event_id")
        update_type = request.json.get("update_type")

        if update_type == "suggest":
            crud.update_event_suggesting(event_id)
        
            return jsonify({"success": "Event books has been updated"})
        
        if update_type == "vote":
            crud.update_voting(event_id)
            event = crud.get_event_by_id(event_id)
            if not event.can_vote:
                events_books = crud.get_all_events_books(event_id)
                vote_totals_dict = {}

                for event_book in events_books:
                    vote_totals_dict[event_book.vote_count] =  vote_totals_dict.get(event_book.vote_count, [])
                    vote_totals_dict[event_book.vote_count].append(event_book.isbn)

                max_votes = set(vote_totals_dict[max(vote_totals_dict)])

                for event_book in events_books:
                    if event_book.isbn not in max_votes:
                        crud.remove_book_from_event(event_book.isbn, event_id)
                    else:
                        crud.reset_vote_count(event_book)

                attendees = crud.get_all_events_attendees(event_id)
                print("attendees", attendees)
                for attendee in attendees:
                    crud.reset_voted_for(attendee)
                

            return jsonify({"success": "Voting has been updated"})


@app.route("/vote", methods=["GET", "POST"])
def update_event_book_votes():
    """Increases the number of votes on a given event book"""
    user_id = session.get("user")

    events = crud.get_all_events_for_user(user_id)
    all_events = {}
    for event in events:
        events_books = crud.get_all_events_books(event.id)
        event_dict = event.to_dict()
        events_books = [event_book.to_dict() for event_book in events_books]
        event_dict["events_books"] = events_books
        all_events[event.id] = event_dict

    if request.method == "GET":
        # get all of the user's event_books
        events_attendee_dict = crud.get_all_users_voted_for_books(user_id)
        # dictionary with event_id as key and list of book isbn's that the given
        # user has voted for (if any) for each event
        
        return jsonify({"booksVotedFor": events_attendee_dict,
                        "allEventsBooks": all_events})

    else:
        event_id = request.json.get("eventId")
        isbn = request.json.get("bookIsbn")

        event_attendee = crud.get_event_attendee_by_id(user_id, event_id)
    
        update = event_attendee.update_voted_for(isbn) # returns, "removed", "added", or None
        events_attendee_dict = crud.get_all_users_voted_for_books(user_id)
       
        # events_books = crud.get_all_events_books(event_id)
        # events_books = [event_book.to_dict() for event_book in events_books]


        if not update:
            # But buttons to vote should already be gone
            return jsonify({"error": "You have already voted twice.",
                            "booksVotedFor": events_attendee_dict,
                            "allEventsBooks": all_events})
        
        event_book = crud.get_event_book_by_isbn(event_id, isbn)
        book = crud.get_book_by_isbn(isbn)

        if update == "removed":
            crud.update_event_book_vote_count(event_book, "remove")
            return jsonify({"success": f"You have successfully 'unvoted' for {book.title}.",
                            "booksVotedFor": events_attendee_dict,
                            "allEventsBooks": all_events})
           
        crud.update_event_book_vote_count(event_book, "add")
        
        if len(events_attendee_dict[event_id]) >= 2:
            # Vote buttons on the front end should disappear (but unvote buttons should remain)
            return jsonify({"success": f"You voted for {book.title}",
                            "booksVotedFor": events_attendee_dict,
                            "buttons": "hidden",
                            "allEventsBooks": all_events})
        
        return jsonify({"success": f"You voted for {book.title}",
                        "booksVotedFor": events_attendee_dict,
                        "buttons": "visible",
                        "allEventsBooks": all_events})
    

@app.route("/events") # GET 
def get_all_events():
    """Returns all events that are not private"""

    events = crud.get_all_events()

    all_events = []

    for event in events:
        event = event.to_dict()
        host = crud.get_user_by_id(event["host_id"]).to_dict()
        attendee_users = crud.get_all_attendees(event["id"])
        attendees = [attendee.to_dict() for attendee in attendee_users if attendee.id != host["id"]]
        
        event["attending"] = attendees
        event["host"] = host
        all_events.append(event)

    all_events_dict = {"events": all_events}

    return jsonify (all_events_dict)


@app.route("/add-attendee", methods=["POST"])  # This could be PUT to combine routes
def add_event_attendee():
    """Adds a user to an event as an attendee"""

    user_id = session.get("user")
    event_id = request.json.get("event")

    user = crud.get_user_by_id(user_id)
    attendees= crud.get_all_attendees(event_id)
    if user in attendees:
        return jsonify({"error": "You are already attending this event"})

    crud.create_event_attendee(user_id, event_id)

    return jsonify ({"success": "You are now attending!"})


@app.route("/add-book-to-event", methods=["POST"]) # Could also be PUT
def add_book_to_event():

    event_id = request.json.get("event_id")
    isbn = request.json.get("isbn")

    event = crud.get_event_by_id(event_id)
    book = crud.get_book_by_isbn(isbn)

    if book not in crud.get_all_books_for_event(event_id): # CHANGED
        crud.create_event_book(event, book) # CHANGED

        return jsonify({"success": f"You have suggested {book.title}"})
    
    else:
        return jsonify({"error": f"That book has already been suggested for the event."})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)