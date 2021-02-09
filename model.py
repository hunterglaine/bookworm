"""Models for bookword app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



def connect_to_db(flask_app, db_name, echo=True):
    """Connect to database."""

    flask_app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql:///{db_name}' # DB_URI
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# if __name__ == '__main__':
#     from server import app

#     connect_to_db(app, 'bookworm')