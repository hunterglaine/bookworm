"""CRUD operations"""

from model import db, Book, User, UserBook, Category, UserBookCategory, Event, EventBook, UserEvent, Friendship, connect_to_db

def create_book(isbn, title, author, description, page_length, image):
    """Create and return a new book"""

    book = Book(isbn=isbn, title=title, author=author, description=description,
                page_length=page_length, image=image)

    db.session.add(book)
    db.session.commit()

    return book


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

