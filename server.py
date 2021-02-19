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

    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("email")
    password = request.json.get("password")
    city = request.json.get("city")
    state = request.json.get("state")

    if crud.get_user_by_email(email):
        return jsonify ({'error': 'An account with this email already exists.'})
    else:
        user = crud.create_user(first_name, last_name, email, password, city, state)
        # return jsonify ({'status': '200',
        #                 'message': 'Account has successfully been created'})
        return jsonify ({'user': {'id': user.id, 
                                    'first_name': user.first_name,
                                    'last_name': user.last_name,
                                    'email': user.email,
                                    'city': user.city,
                                    'state': user.state}})

@app.route('/api/login', methods=["POST"])
def log_in_user():
    """Log a user in and show them they were successful or not."""
    
    email = request.json.get("email")
    password = request.json.get("password")
    print("****", email, password, "*****")

    user = crud.get_user_by_email(email)

    if user:
            if user.password == password:
                session['user'] = user.id
                return jsonify ({'success': 'Successfully logged in!',
                                'user_id': user.id,
                                'user_first_name': user.first_name})
            else:
                return jsonify ({'error': 'Incorrect password. Please try again or create a new account.'})
    else:
        return jsonify ({'error': 'Sorry, but no account exists with that email.'})


@app.route('/api/categories')
def get_user_categories():
    """Returns the categories for a given user."""

    categories = []

    if session.get('user'):
        category_objects = crud.get_all_user_categories(session['user'])

        for category_object in category_objects:

            dict_category = category_object.to_dict()
            categories.append(dict_category)
    print('****'*5, categories, '****'*5)

    return jsonify({'categories': categories})



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