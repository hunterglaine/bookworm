"""Server for Bookworm app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify, json
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "BD647hgfyetEHU789hfehd9svsru5HwgYkghjwrfishvs"


@app.route("/")
def show_homepage():
    """Show the homepage"""

    return render_template("index.html")


@app.route("/api/users", methods=["POST"])
def create_new_user():
    """Create a new user."""

    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("email")
    password = request.json.get("password")
    city = request.json.get("city")
    state = request.json.get("state")

    if crud.get_user_by_email(email):
        return jsonify ({'error': 'An account with this email already exists.'})
    else:
        user = crud.create_user(first_name, last_name, email, password, city, state)
        first_category = crud.create_category(user.id, "My Favorite Books")
        # return jsonify ({'status': '200',
        #                 'message': 'Account has successfully been created'})
        return jsonify ({'user': {'id': user.id, 
                                    'first_name': user.first_name,
                                    'last_name': user.last_name,
                                    'email': user.email,
                                    'city': user.city,
                                    'state': user.state}})

@app.route("/api/login", methods=["POST"])
def log_in_user():
    """Log a user in and show them they were successful or not."""
    
    email = request.json.get("email")
    password = request.json.get("password")

    user = crud.get_user_by_email(email)

    if user:
            if user.password == password:
                session["user"] = user.id
                # session["user"] = user
                return jsonify ({"success": "Successfully logged in!",
                                "user_id": user.id,
                                "user_first_name": user.first_name})
            else:
                return jsonify ({"error": "Incorrect password. Please try again or create a new account."})
    else:
        return jsonify ({"error": "Sorry, but no account exists with that email."})


@app.route("/api/logout", methods=["POST"])
def log_out_user():
    """Log a user out and show them they were successful or not."""
  
    user_id = session.pop("user")
    # user = session.pop("user")
    user = crud.get_user_by_id(user_id)

    return jsonify ({"success": f"{user.first_name}, you have been successfully logged out! Come back soon, and happy reading!"})


@app.route("/api/categories")
def get_user_categories():
    """Returns the categories for a given user."""

    categories = []

    if session.get("user"):
        category_objects = crud.get_all_user_categories(session["user"])
        # category_objects = crud.get_all_user_categories(session["user"].id)

        for category_object in category_objects:

            dict_category = category_object.to_dict()
            categories.append(dict_category)

    return jsonify({"categories": categories})


@app.route("/api/add-category", methods=["POST"])
def add_user_category():
    """Adds a new category to a user"""

    if session.get("user"):
        user_id = session["user"]
        # user = session["user"]
        label = request.json.get("label")

        user = crud.get_user_by_id(user_id)
        
        if crud.get_category_by_label(user_id, label):
            return ({"error": f"{label} is already in {user.first_name}'s bookshelf!"})

        new_category = crud.create_category(user_id, label)

        return jsonify ({"success": f"{new_category.label} has been added to {user.first_name}'s bookshelf!"})


@app.route("/api/update-category", methods=["POST"])
def update_category_label():
    """Updates a user's category label"""

    if session.get("user"):
        user_id = session["user"]
        # user_id = session["user"].id
        old_label = request.json.get("old_label")
        new_label = request.json.get("new_label")

    crud.update_category_label(user_id, old_label, new_label)

    return jsonify({"success": f"{old_label} has been changed to {new_label}!"})


@app.route("/api/add-book-to-category", methods=["POST"])
def add_user_book():
    """Adds a new book to a user's books"""
    if session.get("user"):
        user_id = session["user"]
        label = request.json.get("label")
        book = request.json.get("book")
        
        if book['volumeInfo']['industryIdentifiers'][0]['type'] == 'ISBN_13': 
            isbn = book['volumeInfo']['industryIdentifiers'][0].get('identifier')
        else:
            isbn = book['volumeInfo']['industryIdentifiers'][1].get('identifier')

        the_book = crud.get_book_by_isbn(isbn)
        this_category = crud.get_category_by_label(user_id, label)
        
        if the_book == None:
            the_book = crud.create_book(isbn, 
                                        book['volumeInfo']['title'], 
                                        book['volumeInfo']['authors'], 
                                        book['volumeInfo']['description'], 
                                        book['volumeInfo']['pageCount'], 
                                        book['volumeInfo']['imageLinks']['thumbnail'])

        if this_category == None:
            this_category = crud.create_category(user_id, label)

            added_books = crud.create_book_category(the_book, this_category)
            return jsonify ({'success': f"""A new category, {this_category.label}, has been added to your bookshelf and {the_book.title} has been added to it"""})

        if the_book in crud.get_all_books_in_category(user_id, label):
            return jsonify ({'error': f'{the_book.title} is already in your {this_category.label} books'})

        added_books = crud.create_book_category(the_book, this_category)
        # Right now, added_books is a list of all of the book objects in this_category
        
        return jsonify ({'success': f'{the_book.title} has been added to {this_category.label} books'})
        # 'books_in_category': added_books


@app.route("/api/remove-book-from-category", methods=["POST"])
def remove_book_from_category():
    """Removes a user's book from a category"""

    if session.get("user"):
        user_id = session["user"]
        label = request.json.get("category")
        isbn = request.json.get("isbn")
        title = request.json.get("title")

        this_category = crud.get_category_by_label(user_id, label)

        crud.remove_book_from_category(isbn, this_category.id)

    return jsonify ({"success": f"{title} has successfully been removed from {label}."})


@app.route("/api/user-data")
def get_user_data():
    """Returns user's categories and books within them"""

    if session.get("user"):
        user_id = session["user"]

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

@app.route("/api/new-event", methods=["POST"])
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
        crud.create_user_event(host_id, new_event.id)

        return jsonify ({"success": f"Your event has successfully been created for {eventDate} at {startTime}"})

    else:
        return jsonify ({"error": "There was an error creating this event."})


@app.route("/api/user-events")
def get_user_events():
    """Returns user's events, hosting and attending"""

    if session.get("user"):
        user_id = session["user"]

        users_events = crud.get_all_users_events(user_id)
        # A list of the user's event objects

        users_events_dict = {"hosting": [], "attending": []}

        for event in users_events:
            event = event.to_dict()
            if event["host_id"] == user_id:
                users_events_dict["hosting"].append(event)
            else:
                users_events_dict["attending"].append(event)


        return jsonify (users_events_dict)

    else:
        return jsonify ({'error': 'User must be logged in to view their events.'})


@app.route("/api/all-events")
def get_all_events():
    """Returns all events that are not private"""

    events = crud.get_all_events()

    # all_events = [event.to_dict() for event in events]

    all_events = []

    for event in events:
        event = event.to_dict()
        attendee_users = crud.get_all_attendees(event["id"])
        attendees = [attendee.to_dict() for attendee in attendee_users]
        event["attending"] = attendees
        all_events.append(event)

    all_events_dict = {"events": all_events}

    return jsonify (all_events_dict)


@app.route("/api/add-attendee", methods=["POST"])
def add_event_attendee():
    """Adds a user to an event as an attendee"""

    user_id = session.get("user")
    event_id = request.json.get("event")

    user = crud.get_user_by_id(user_id)
    attendees= crud.get_all_attendees(event_id)
    if user in attendees:
        return jsonify({"error": "You are already attending this event"})

    crud.create_user_event(user_id, event_id)

    return jsonify ({"success": "You are now attending!"})


if __name__ == "__main__":
    connect_to_db(app, "testbookworm")
    app.run(host="0.0.0.0", debug=True)