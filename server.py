"""Server for Bookworm app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify, json
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = 'BD647hgfyetEHU789hfehd9svsru5HwgYkghjwrfishvs'


@app.route('/')
def show_homepage():
    """Show the homepage"""

    return render_template('index.html')

@app.route('/api/users', methods=["POST"])
def create_new_user():
    """Create a new user."""

    first_name = request.form.get('first-name')
    last_name = request.form.get('last-name')
    email = request.form.get('email')
    password = request.form.get('password')
    city = request.form.get('city')
    state = request.form.get('state')

    if crud.get_user_by_email(email):
        return jsonify ({'status': '404',
                        'message': 'An account with this email already exists.'})
    else:
        new_user = crud.create_user(first_name, last_name, email, password, city, state)
        # return jsonify ({'status': '200',
        #                 'message': 'Account has successfully been created'})
        return jsonify ({'user': {'id': user.id, 
                                    'first_name': user.first_name,
                                    'last_name': user.last_name,
                                    'email': user.email,
                                    'city': user.city,
                                    'state': user.state}})

@app.route('/api/login', methods=["GET", "POST"])
def log_in_user():
    """Log a user in and show them they were successful or not."""
    # data = request.get_json()
    # print(data)
    email = request.form.get('email')
    password = request.form.get('password')
    # email = request.json["email"]
    # password = request.json["password"]
    print(email, password)

    user = crud.get_user_by_email(email)

    if user:
            if user.password == password:
                session['user'] = user.id
                return jsonify ({'status': 'success',
                                'message': 'Successfully logged in',
                                'user_id': user.id,
                                'user_first_name': user.first_name})
            else:
                return jsonify ({'status': 'error',
                                'message': 'Incorrect Password'})
    else:
        return jsonify ({'status': 'error',
                        'message': 'User does not exist'})


@app.route('/api/books', methods=["POST"])
def add_user_book():
    """Adds a new book to a user's books"""

    if session.get('user'):
        isbn = request.form.get('isbn')
        title = request.form.get('title')
        author = request.form.get('author')
        description = request.form.get('description')
        page_length = request.form.get('page-length')
        image = request.form.get('image')
        if not crud.get_book_by_isbn(isbn):
            crud.create_book(isbn, title, author, description, page_length, 
                            image)
        
        user_id = session['user']
        if not get_user_book_by_search(title):
            crud.create_user_book(isbn, user_id)
            return jsonify ({'status': '200',
                        'message': 'Book has been added to bookshelf'})

        else:
            return jsonify ({'status': '404',
                            'message': 'Book is already in your shelf'})
    else:
        return jsonify ({'status': '400',
                        'message': 'User must be logged in first'})



if __name__ == '__main__':
    connect_to_db(app, 'testbookworm')
    app.run(host='0.0.0.0', debug=True)