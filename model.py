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
    image_thumb = db.Column(db.String)
    image_large = db.Column(db.String)


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
    is_searchable = db.Column(db.Boolean(), nullable=False, default=True) 
    # Won't deafult to True


    def __repr__(self):

        return f'<User id={self.id} email={self.email}>'


def connect_to_db(flask_app, db_name, echo=True):
    """Connect to database."""

    flask_app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql:///{db_name}' # DB_URI
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# if __name__ == '__main__':
#     from server import app

#     connect_to_db(app, 'bookworm')