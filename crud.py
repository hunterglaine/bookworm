"""CRUD operations"""

from model import db, Book, User, Category, BookCategory, Event, EventBook, EventAttendee, Friendship, connect_to_db


# ***** CREATE FUNCTIONS *****
def create_book(isbn, title, author, description, page_length, image):
    """Create and return a new book"""

    book = Book(isbn=isbn, 
                title=title, 
                author=author, 
                description=description,
                page_length=page_length, 
                image=image)

    db.session.add(book)
    db.session.commit()

    return book


def create_user(first_name, last_name, email, password, city=None, 
                state=None):
    """Create and return a new user"""
    email = email.lower()
    user = User(first_name=first_name, 
                last_name=last_name, 
                email=email,  
                city=city, 
                state=state)

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return user


def create_category(user_id, label):
    """Create and return a new category"""

    category = Category(user_id=user_id, label=label)

    db.session.add(category)
    db.session.commit()

    return category


def create_book_category(book, category):
    """Create and return a new book_category / place a book in 
    a user's existing categories"""

    book.categories.append(category)
    db.session.commit()

    return category.books


def create_event(host_id, city, event_date, start_time, end_time, state=None):
    """Create and return a new event"""

    event = Event(host_id=host_id, city=city, state=state, event_date=event_date,
                    start_time=start_time, end_time=end_time)

    db.session.add(event)
    db.session.commit()

    return event


def create_event_book(event, book):
    """Create and return a new event_book"""

    event_book = EventBook(isbn=book.isbn, event_id=event.id)

    db.session.add(event_book)
    db.session.commit()

    return event_book


def create_event_attendee(user_id, event_id):
    """Create and return a new event_attendee"""

    user = get_user_by_id(user_id)
    event = get_event_by_id(event_id)

    event.users.append(user)
    db.session.commit()

    return event.users


# Still need to create a function to create Friendships, but need to finalize 
# how they work...

# ***** READ Functions *****
def get_book_by_isbn(isbn):
    """Returns a book with given ISBN if it exists in the database, otherwise, 
    returns None"""

    book = Book.query.filter(Book.isbn == isbn).options(db.joinedload("categories")).first()

    return book


def get_all_user_books(user_id):
    """Returns all books for given user"""

    categories = Category.query.filter(Category.user_id == user_id).options(db.\
                            joinedload("books")).all()
    # categories is a list of category objects belonging to given user

    users_books = []
    for category in categories:
        users_books.extend(category.books)

    return users_books


def get_user_book_by_search(user_id, search):
    """Returns a user_book by title or author"""

    their_books = get_all_user_books(user_id)

    books = []
    for book in their_books:
        if book.title == search or book.author == search:
            books.append(book)
    
    return books


def get_book_by_search(search):
    """Returns a book by title or author"""

    book = Book.query.filter((Book.author == search) | (Book.title == search)).all()

    return book


def get_user_by_id(user_id):
    """Returns a user for a given user_id"""

    user = User.query.filter(User.id == user_id).first()

    return user


def get_user_by_email(email):
    """Returns a user for a given email"""

    user = User.query.filter(User.email == email).first()

    return user


def get_all_categories():
    """Returns all categories in database - for internal use"""

    categories = Category.query.all()

    return categories


def get_all_user_categories(user_id):
    """Returns a list of all categories for given user"""

    categories = Category.query.filter(Category.user_id == user_id).all()

    return categories


def get_all_user_category_labels(user_id):
    """Returns a list of all categories for given user"""

    categories = Category.query.filter(Category.user_id == user_id).all()

    category_labels = [category.label for category in categories]

    return category_labels


def get_all_books_in_category(user_id, label):
    """Returns a list of all book objects in a given user's category"""

    category = get_category_by_label(user_id, label)

    return category.books


def get_category_by_label(user_id, label):
    """Returns a category with a given label"""

    category = Category.query.filter(Category.label == label, Category.\
                                    user_id == user_id).\
                                    options(db.joinedload("books")).first()

    return category


def get_all_users():
    """Returns a list of all users with is_searchable set to True"""

    return User.query.filter(User.is_searchable == True).all()


def get_all_events():
    """Returns a list of all events with is_private set to False"""

    return Event.query.filter(Event.is_private == False).order_by(Event.\
                            event_date.asc(), Event.start_time.asc()).all()


def get_all_events_for_user(user_id):
    """Returns a list of all events for a given user"""

    events = Event.query.join(EventAttendee).filter(EventAttendee.user_id == user_id).\
            order_by(Event.event_date.asc(), Event.start_time.asc()).all()
      
    return events


def get_event_attendee_by_id(user_id, event_id):
    """Returns an event_attendee object for a given user and event"""

    event_attendee = EventAttendee.query.filter(EventAttendee.user_id == user_id, EventAttendee.\
                                        event_id == event_id).first()
    
    return event_attendee


def get_all_events_attendees_for_user(user_id):
    """Returns user event objects for a given user"""

    events_attendees = EventAttendee.query.filter(EventAttendee.user_id == user_id, EventAttendee.\
                                        is_attending == True).all()
    
    return events_attendees


def get_all_events_attendees(event_id):
    """Returns event_attendee objects for a given event"""

    events_attendees = EventAttendee.query.filter(EventAttendee.event_id == event_id).all()
    
    return events_attendees


def get_all_users_voted_for_books(user_id):
    """Returns event_attendee objects for a given user and event"""

    events_attendees = get_all_events_attendees_for_user(user_id)
    
    event_attendee_voted_for = {event_attendee.event_id: event_attendee.voted_for.\
                                split() for event_attendee in events_attendees}
    
    return event_attendee_voted_for


def get_all_books_for_event(event_id):
    """Returns a list of all books for a given event"""

    events_books = get_all_events_books(event_id)

    books = [event_book.book for event_book in events_books]
    
    return books


def get_all_events_books(event_id):
    """Returns a list of event_book objects for a given event"""
    
    # event = Event.query.options(db.joinedload("events_books")).get(event_id)
    events_books = EventBook.query.filter(EventBook.event_id == event_id).options(db.joinedload("book")).all()

    # return event.events_books
    return events_books


def get_event_book_by_isbn(event_id, isbn):

    event_book = EventBook.query.filter(EventBook.event_id == event_id, EventBook.isbn == isbn).first()
    
    return event_book


def get_all_attendees(event_id):
    """Returns a list of all user's attending an event."""

    event = get_event_by_id(event_id)

    return event.users


def get_event_by_id(event_id):
    """Returns an event object given an event id"""

    event = Event.query.filter(Event.id == event_id).options(db.\
                            joinedload("users")).first()

    return event


# ***** UPDATE Functions *****
def make_user_private(user_id):
    """Updates is_searchable for a given user to False"""

    user = get_user_by_id(user_id)
    user.is_searchable = False
    db.session.commit()


def update_user_account(user_id, new_first_name=None, new_last_name=None, 
                        new_email=None, new_city=None, new_state=None,
                        old_password=None, new_password=None):
    """Update info for a given user's account"""

    user = get_user_by_id(user_id)

    if new_first_name:
        user.first_name = new_first_name

    if new_last_name:
        user.last_name = new_last_name

    if new_email:
        user.email = new_email

    if new_city:
        user.city = new_city
    
    if new_state:
        user.state = new_state

    if new_password:
        if user.check_password(old_password):
            user.set_password(new_password)
    
    db.session.commit()


def update_user_email(user_id, new_email):
    """Updates email on a given user"""

    user = get_user_by_id(user_id)
    user.email = new_email
    db.session.commit()


def update_user_location(user_id, new_city, new_state):
    """Updates location on a given user"""

    user = get_user_by_id(user_id)
    user.city = new_city
    user.state = new_state
    db.session.commit()


def change_password(user_id, old_password, new_password):
    """Change given user's password"""

    user = get_user_by_id(user_id)

    if user.check_password(old_password):
        user.set_password(new_password)
        db.session.commit()


def update_category_label(user_id, old_label, new_label):
    """Change a category label"""

    category = Category.query.filter(Category.label == old_label, Category.\
                                    user_id == user_id).first()
    
    category.label = new_label
    db.session.commit()


def update_event_book_vote_count(event_book, operation):
    """Updates the vote count on an event_book"""
    if operation == "add":
        event_book.vote_count += 1
    elif operation =="remove":
        event_book.vote_count -= 1

    db.session.commit()


# Maybe add comments to book_categories?
# def add_comment_to_user_book(user_book_id, new_comment):
#     """Add a comment to user's book, given it's id"""

#     user_book = UserBook.query.filter(UserBook.id == user_book_id).one()
#     user_book.comment = new_comment
#     db.session.commit()

#     return user_book


def update_event_suggesting(event_id): # MAYBE CHANGE (?)
    """Updates the event to allow or disallow books suggestions"""

    event = get_event_by_id(event_id)  

    event.can_add_books = not event.can_add_books
    
    db.session.commit()


def update_voting(event_id): # MAYBE CHANGE (?)
    """Updates the ability to vote on books for an event"""

    event = get_event_by_id(event_id) 

    event.can_vote = not event.can_vote
    
    db.session.commit()


def reset_vote_count(event_book):
    """Resets an event_book vote_count to 0"""

    event_book.vote_count = 0
    db.session.commit()


def reset_voted_for(attendee):
    """Reset voted_for for an attendee"""

    attendee.voted_for = ""
    db.session.commit()


# ***** DELETE Functions *****
def delete_category(label, user_id):
    "Deletes a category and all book realtionships in it"

    category_to_delete = Category.query.filter(Category.label == label, Category.\
                                                user_id == user_id).first()

    db.session.delete(category_to_delete)
    db.session.commit()


def delete_event(event_id, host_id):
    "Deletes an event and all its attendees"

    event_to_delete = Event.query.get(event_id)

    db.session.delete(event_to_delete)
    db.session.commit()


def remove_book_from_category(isbn, category_id):
    """Removes a particular book from a user's category"""

    category = Category.query.filter(Category.id == category_id).first()
    # category is a category object that can reference the books table
    book = get_book_by_isbn(isbn)
    book.categories.remove(category)
    db.session.commit()


def remove_book_from_event(isbn, event_id):
    """Removes a particular book from an event"""

    event_book = EventBook.query.filter(EventBook.isbn == isbn, EventBook.event_id == event_id).first()
    
    event = get_event_by_id(event_id)
    event.events_books.remove(event_book)
    db.session.commit()


def delete_book(isbn):
    """Deletes a book from the database--internal use only"""

    book = Book.query.filter(Book.isbn == isbn).first()

    db.session.delete(book)
    db.session.commit()


def remove_attendee_from_event(user_id, event_id):
    """Remove a particular attendee from a particular event"""

    user = get_user_by_id(user_id)
    event = get_event_by_id(event_id)

    event.users.remove(user)
    db.session.commit()


if __name__ == "__main__":
    from server import app
    connect_to_db(app)

