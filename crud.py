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
    """Create and return a new user_book"""

    category = Category(label=label)

    db.session.add(category)
    db.session.commit()

    return category


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

