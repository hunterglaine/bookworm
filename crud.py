"""CRUD operations"""

from model import db, Book, User, Category, BookCategory, Event, EventBook, UserEvent, Friendship, connect_to_db


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

    user = User(first_name=first_name, 
                last_name=last_name, 
                email=email, 
                password=password, 
                city=city, 
                state=state)

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

    event.books.append(book)
    db.session.commit()

    return event.books


def create_user_event(user_id, event_id):
    """Create and return a new event_user (attendee)"""

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

    book = Book.query.filter(Book.isbn == isbn).options(db.joinedload('categories')).first()

    return book


def get_all_user_books(user_id):
    """Returns all books for given user"""

    categories = Category.query.filter(Category.user_id == user_id).options(db.\
                            joinedload('books')).all()
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
                                    options(db.joinedload('books')).first()

    return category


def get_all_users():
    """Returns a list of all users with is_searchable set to True"""

    return User.query.filter(User.is_searchable == True).all()


def get_all_events():
    """Returns a list of all events with is_private set to False"""

    return Event.query.filter(Event.is_private == False).all()


def get_all_users_events(user_id):
    """Returns a list of all events for a given user"""

    user = User.query.filter(User.id == user_id).options(db.\
                            joinedload('events')).first()

    return user.events


def get_all_attendees(event_id):
    """Returns a list of all user's attending an event."""

    event = get_event_by_id(event_id)

    return event.users


def get_event_by_id(event_id):
    """Returns an event object given an event id"""

    event = Event.query.filter(Event.id == event_id).options(db.\
                            joinedload('users')).first()

    return event



# ***** UPDATE Functions *****
def make_user_private(user_id):
    """Updates is_searchable for a given user to False"""

    user = get_user_by_id(user_id)
    user.is_searchable = False
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


def change_password(user_id, new_password):
    """Change given user's password"""

    user = get_user_by_id(user_id)
    user.password = new_password
    db.session.commit()


def update_category_label(user_id, old_label, new_label):
    """Change a category label"""

    category = Category.query.filter(Category.label == old_label, Category.\
                                    user_id == user_id).first()
    
    category.label = new_label
    db.session.commit()

# Maybe add comments to book_categories?
# def add_comment_to_user_book(user_book_id, new_comment):
#     """Add a comment to user's book, given it's id"""

#     user_book = UserBook.query.filter(UserBook.id == user_book_id).one()
#     user_book.comment = new_comment
#     db.session.commit()

#     return user_book


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


if __name__ == '__main__':
    from server import app
    connect_to_db(app, 'testbookworm')

