"""Models for bookword app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Book(db.Model):
    """Book class."""

    __tablename__ = 'books'

    isbn = db.Column(db.String(13), primary_key=True)
    title = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    page_length = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String)

    # users = a list of user objects, with secondary users_books
    # events = a list of event objects, with secondary events_books

    def __repr__(self):

        return f'<Book ISBN={self.isbn} title={self.title}>'


class User(db.Model):
    """User class."""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(30))
    state = db.Column(db.String(2))
    is_searchable = db.Column(db.Boolean, default=True) 
    
    books = db.relationship("Book", secondary='users_books', backref='users')
    # events = a list of event objects, with secondary users_events


    def __repr__(self):

        return f'<User id={self.id} email={self.email}>'


class UserBook(db.Model):
    """Book of a specific user."""

    __tablename__ = 'users_books'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    isbn = db.Column(db.String(13), db.ForeignKey('books.isbn'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    in_bookshelf = db.Column(db.Boolean, default=True)
    comment = db.Column(db.Text)

    categories = db.relationship('Category', secondary='users_books_categories',
                                backref='users_books')


    def __repr__(self):

        return f'<UserBook id={self.id} in_bookshelf={self.in_bookshelf}>'


class Category(db.Model):
    """Category class."""

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label = db.Column(db.String(50), nullable=False, unique=True)
    in_category = db.Column(db.Boolean, default=True)

    # users_books = a list of user_book objects, with secondary users_books_categories


    def __repr__(self):

        return f'<Category id={self.id} label={self.label}>'


class UserBookCategory(db.Model):
    """Category of a specific UserBook"""

    __tablename__ = 'users_books_categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_book_id = db.Column(db.Integer, db.ForeignKey('users_books.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))


    def __repr__(self):

        return f'<UserBookCategory id={self.id}>'


class Event(db.Model):
    """Event class."""

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(2))
    start_datetime = db.Column(db.DateTime(), nullable=False)
    end_datetime = db.Column(db.DateTime(), nullable=False)

    users = db.relationship('User', secondary='users_events', backref='events')
    books = db.relationship('Book', secondary='events_books', backref='events')


    def __repr__(self):

        return f'<Event id={self.id} city={self.city}>'


class EventBook(db.Model):
    """Book of a specific Event."""

    __tablename__ = 'events_books'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    isbn = db.Column(db.String(13), db.ForeignKey('books.isbn'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    vote_count = db.Column(db.Integer, default=0)
    is_the_one = db.Column(db.Boolean, default=True)


    def __repr__(self):

        return f'<EventBook id={self.id}>'


class UserEvent(db.Model):
    """Event of a specific user."""

    __tablename__ = 'users_events'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    is_attending = db.Column(db.Boolean, default=True)


    def __repr__(self):

        return f'<UserEvent id={self.id}>'

    
class Friendship(db.Model):
    """Friendship class."""

    __tablename__ = 'friendships'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    requestor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # requested_id = db.Column(db.Integer, db.ForeignKey('users.id')) - need to figure this out
    is_friend = db.Column(db.Boolean, default=False)
    pending = db.Column(db.Boolean, default=True)

    users = db.relationship('User', backref='friendships')


    def __repr__(self):

        return f'<Friendship id={self.id}>'


def connect_to_db(flask_app, echo=True):
    """Connect to database."""

    flask_app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql:///bookworm' # DB_URI
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)


if __name__ == '__main__':
    from server import app

    connect_to_db(app)