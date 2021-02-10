"""CRUD operations"""

from model import db, Book, User, UserBook, Category, UserBookCategory, Event, EventBook, UserEvent, Friendship, connect_to_db

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


def create_category(label):
    """Create and return a new category"""

    category = Category(label=label)

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


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

