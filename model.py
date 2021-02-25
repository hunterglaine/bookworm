"""Models for bookworm app."""

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

    ###REMOVE### users = a list of user objects, with secondary users_books
    # events = a list of event objects, with secondary events_books
    # categories = a list of category objects, with secondary books_categories

    def __repr__(self):

        return f'<Book ISBN={self.isbn} title={self.title}>'


    def to_dict(self):
        """Turns book object into a dictionary"""

        book = {"isbn": self.isbn,
                "title": self.title,
                "author": self.author,
                "description": self.description,
                "page_length": self.page_length,
                "image": self.image}

        return book


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
    
    ###REMOVE### books = db.relationship("Book", secondary='users_books', backref='users')
    # events = a list of event objects, with secondary users_events
    # categories = a list of category objects

    def __repr__(self):

        return f'<User id={self.id} email={self.email}>'


# class UserBook(db.Model):
#     """Book of a specific user."""

#     __tablename__ = 'users_books'

#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     isbn = db.Column(db.String(13), db.ForeignKey('books.isbn'))
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     in_bookshelf = db.Column(db.Boolean, default=True)
#     comment = db.Column(db.Text)


#     def __repr__(self):

#         return f'<UserBook id={self.id} in_bookshelf={self.in_bookshelf}>'


class Category(db.Model):
    """Category class."""

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    label = db.Column(db.String(50), nullable=False)


    user = db.relationship('User', backref='categories')
    books = db.relationship('Book', secondary='books_categories', backref='categories')


    def __repr__(self):

        return f'<Category id={self.id} label={self.label}>'


    def to_dict(self):
        """Turns category object into a dictionary"""

        category = {'id': self.id,
                    'user_id': self.user_id,
                    'label': self.label}

        return category


class BookCategory(db.Model):
    """Category of a specific Book"""

    __tablename__ = 'books_categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    isbn = db.Column(db.String(13), db.ForeignKey('books.isbn'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))


    def __repr__(self):

        return f'<BookCategory id={self.id}>'


class Event(db.Model):
    """Event class."""

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(2))
    event_date = db.Column(db.Date(), nullable=False)
    start_time = db.Column(db.Time(), nullable=False)
    end_time = db.Column(db.Time(), nullable=False)
    is_private = db.Column(db.Boolean, default=False)

    users = db.relationship('User', secondary='users_events', backref='events')
    books = db.relationship('Book', secondary='events_books', backref='events')


    def __repr__(self):

        return f'<Event id={self.id} city={self.city}>'

    
    def to_dict(self):
        """Turns event object into a dictionary"""

        event = {"host_id": self.host_id,
                "city": self.city,
                "state": self.state,
                "event_date": self.event_date,
                "start_time": str(self.start_time)[:5],
                "end_time": str(self.end_time)[:5],
                "is_private": self.is_private}

        return event


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


def connect_to_db(flask_app, database='bookworm', echo=True):
    """Connect to database."""

    flask_app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql:///{database}' # DB_URI
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)


if __name__ == '__main__':
    from server import app

    connect_to_db(app, 'testbookworm')