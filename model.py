"""Models for bookworm app."""

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Book(db.Model):
    """Book class."""

    __tablename__ = "books"

    isbn = db.Column(db.String(13), primary_key=True)
    title = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    page_length = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String)

    # events_books = backref to events_books table
    # categories = backref to categories table, with secondary books_categories

    def __repr__(self):

        return f"<Book ISBN={self.isbn} title={self.title}>"


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

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128))
    city = db.Column(db.String(30))
    state = db.Column(db.String(2))
    is_searchable = db.Column(db.Boolean, default=True) 
    
    # events = backref to events table, with secondary events_attendees
    # categories = backref to categories table

    def __repr__(self):

        return f"<User id={self.id} email={self.email}>"


    def to_dict(self):

        user = {"id": self.id,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "email": self.email,
                "city": self.city,
                "state": self.state,
                "is_searchable": self.is_searchable}
        
        return user
    

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password_hash, password)    



class Category(db.Model):
    """Category class."""

    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    label = db.Column(db.String(50), nullable=False)


    user = db.relationship("User", backref="categories")
    books = db.relationship("Book", secondary="books_categories", backref="categories")


    def __repr__(self):

        return f"<Category id={self.id} label={self.label}>"


    def to_dict(self):
        """Turns category object into a dictionary"""

        category = {"id": self.id,
                    "user_id": self.user_id,
                    "label": self.label}

        return category


class BookCategory(db.Model):
    """Category of a specific Book"""

    __tablename__ = "books_categories"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    isbn = db.Column(db.String(13), db.ForeignKey("books.isbn"))
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))


    def __repr__(self):

        return f"<BookCategory id={self.id}>"


class Event(db.Model):
    """Event class."""

    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    host_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(2))
    event_date = db.Column(db.Date(), nullable=False)
    start_time = db.Column(db.Time(), nullable=False)
    end_time = db.Column(db.Time(), nullable=False)
    is_private = db.Column(db.Boolean, default=False)
    can_add_books = db.Column(db.Boolean, default=False)
    can_vote = db.Column(db.Boolean, default=False)

    users = db.relationship("User", secondary="events_attendees", backref="events")
    # events_books = backref to events_books table

    def __repr__(self):

        return f"<Event id={self.id} city={self.city}>"

    
    def to_dict(self):
        """Turns event object into a dictionary"""

        event = {"id": self.id,
                "host_id": self.host_id,
                "city": self.city,
                "state": self.state,
                "event_date": self.event_date,
                "start_time": str(self.start_time)[:5],
                "end_time": str(self.end_time)[:5],
                "is_private": self.is_private,
                "can_add_books": self.can_add_books,
                "can_vote": self.can_vote}
                

        return event


class EventBook(db.Model):
    """Book of a specific Event."""

    __tablename__ = "events_books"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    isbn = db.Column(db.String(13), db.ForeignKey("books.isbn"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    vote_count = db.Column(db.Integer, default=0)
    is_the_one = db.Column(db.Boolean, default=True)

    event = db.relationship("Event", backref="events_books") # CHANGED
    book = db.relationship("Book", backref="events_books") # CHANGED


    def __repr__(self):

        return f"<EventBook id={self.id}>"


    def to_dict(self):
        """Turns event_book object into a dictionary"""

        event_book = {"id": self.id,
                    "isbn": self.isbn,
                    "event_id": self.event_id,
                    "vote_count": self.vote_count,
                    "is_the_one": self.is_the_one}

        return event_book


class EventAttendee(db.Model): # chng
    """Event a specific user is attending."""

    __tablename__ = "events_attendees"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    is_attending = db.Column(db.Boolean, default=True)
    voted_for = db.Column(db.String, default="")

    event = db.relationship("Event", backref="events_attendees")
    user = db.relationship("User", backref="events_attendees")


    def __repr__(self):

        return f"<EventAttendee id={self.id}>"

    
    def update_voted_for(self, isbn):
        """Updates voted_for attribute to remove an isbn if it is already there
        and add the isbn if it is not and the number of books already voted for
        is 2 or less"""
        vote_list = self.voted_for.split()

        if isbn in vote_list:
            vote_list.remove(isbn) 
            self.voted_for = " ".join(vote_list)

            return("removed")

        if len(vote_list) < 2:
            self.voted_for += f" {isbn} "

            return("added")

        
        # def voted_to_dict(self):
        #     """Returns a dicitionary..."""
        #     event_attendee = {self.event_id: self.voted_for}



class Friendship(db.Model):
    """Friendship class."""

    __tablename__ = "friendships"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    requestor_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # requested_id = db.Column(db.Integer, db.ForeignKey('users.id')) - need to figure this out
    is_friend = db.Column(db.Boolean, default=False)
    pending = db.Column(db.Boolean, default=True)

    users = db.relationship("User", backref="friendships")


    def __repr__(self):

        return f"<Friendship id={self.id}>"


def connect_to_db(flask_app, database="bookworm", echo=False):
    """Connect to database."""

    flask_app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///{database}" # DB_URI
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)


if __name__ == "__main__":
    from server import app

    connect_to_db(app)