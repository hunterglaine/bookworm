"""CRUD operations"""

from model import db, Book, User, UserBook, Category, UserBookCategory, Event, EventBook, UserEvent, Friendship, connect_to_db


# ***** CREATE FUNCTIONS *****
def create_book(isbn, title, author, description, page_length, image):
    """Create and return a new book"""

    book = Book(isbn=isbn, title=title, author=author, description=description,
                page_length=page_length, image=image)

    db.session.add(book)
    db.session.commit()

    return book


def create_user(first_name, last_name, email, password, city=None, 
                state=None):
    """Create and return a new user"""

    user = User(first_name=first_name, last_name=last_name, email=email, 
                password=password, city=city, state=state)

    db.session.add(user)
    db.session.commit()

    return user


def create_user_book(isbn, user_id, comment=''):
    """Create and return a new user_book"""

    user_book = UserBook(isbn=isbn, user_id=user_id, comment=comment)

    db.session.add(user_book)
    db.session.commit()

    return user_book


def create_category(user_id, label):
    """Create and return a new category"""

    category = Category(user_id=user_id, label=label)

    db.session.add(category)
    db.session.commit()

    return category


def create_user_book_category(user_book_id, category_id):
    """Create and return a new user_book_category"""

    user_book_category = UserBookCategory(user_book_id=user_book_id, 
                                        category_id=category_id)

    db.session.add(user_book_category)
    db.session.commit()

    return user_book_category


def create_event(host_id, city, start_datetime, end_datetime, state=None):
    """Create and return a new event"""

    event = Event(host_id=host_id, city=city, state=state, 
                    start_datetime=start_datetime, end_datetime=end_datetime)

    db.session.add(event)
    db.session.commit()

    return event


def create_event_book(isbn, event_id):
    """Create and return a new event_book"""

    event_book = EventBook(isbn=isbn, event_id=event_id)

    db.session.add(event_book)
    db.session.commit()

    return event_book


def create_user_event(user_id, event_id):
    """Create and return a new event_book"""

    user_event = UserEvent(user_id=user_id, event_id=event_id)

    db.session.add(user_event)
    db.session.commit()

    return user_event


# Still need to create a function to create Friendships, but need to finalize 
# how they work...


def get_all_user_books(user_id):
    """Returns all users_books for given user"""

    user = User.query.filter(User.id == user_id).options(db.\
                            joinedload('books')).one()

    return user.books


def get_user_book_by_search(user_id, search):
    """Returns a user_book by title or author"""

    their_books = get_all_user_books(user_id)

    books = []
    for book in their_books:
        print(book.title)
        print(book.author)
        if book.title == search or book.author == search:
            books.append(book)
    
    return books

# Unnecessary function
# def get_book_by_search(search):
#     """Returns a book by title or author"""

#     book = Book.query.filter((Book.author == search) | (Book.title == search)).all()

#     return book

# ***** READ Functions *****
def get_user_by_id(user_id):
    """Returns a user for a given user_id"""

    user = User.query.filter(User.id == user_id).one()

    return user


def get_all_user_categories(user_id):
    """Returns a list of all categories for given user"""

    user = User.query.filter(User.id == user_id).options(db.\
                            joinedload('categories')).one()

    return user.categories


def get_all_books_in_category(user_id, label):
    """Returns a list of all book objects in a given user's category"""

    category = Category.query.filter(Category.label == label, Category.\
                                    user_id == user_id).\
                                    options(db.joinedload('users_books')).one()

    return category.users_books


def get_all_users():
    """Returns a list of all users with is_searchable set to True"""

    return User.query.filter(User.is_searchable == True).all()


def get_all_events():
    """Returns a list of all events with is_private set to False"""

    return Event.query.filter(Event.is_private == False).all()


# ***** UPDATE Functions *****
def make_user_private(user_id):
    """Updates is_searchable for a given user to False"""

    user = get_user_by_id(user_id)
    user.is_searchable = False
    db.session.commit()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

