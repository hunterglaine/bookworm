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


@app.route('/api/logout', methods=["POST"])
def log_out_user():
    """Log a user out and show them they were successful or not."""
    print('1111111111111111111111111', session.get('user'), '1111111111111111111')
    user_id = session.pop('user')
    print('22222222222222222222222222', session.get('user'), '22222222222222222222')
    user = crud.get_user_by_id(user_id)

    return jsonify ({'success': f'{user.first_name}, you have been successfully logged out! Come back soon, and happy reading!'})


@app.route('/api/categories')
def get_user_categories():
    """Returns the categories for a given user."""

    categories = []

    if session.get('user'):
        category_objects = crud.get_all_user_categories(session['user'])

        for category_object in category_objects:

            dict_category = category_object.to_dict()
            categories.append(dict_category)
    # print('****'*5, categories, '****'*5)

    return jsonify({'categories': categories})


@app.route('/api/add-category', methods=["POST"])
def add_user_category():
    """Adds a new category to a user"""
    print(session.get('user'))
    if session.get('user'):
        user_id = session['user']
        label = request.json.get("label")

        print("888888888888888888888", "label:", label, "88888888888888888888888888888")
        user = crud.get_user_by_id(user_id)
        
        if get_category_by_label(user_id, label):
            return ({'error': f'{label} is already in {user.first_name}\'s bookshelf!'})

        new_category = crud.create_category(user_id, label)

        return jsonify ({'success': f'{new_category.label} has been added to {user.first_name}\'s bookshelf!'})


@app.route('/api/add-book-to-category', methods=["POST"])
def add_user_book():
    """Adds a new book to a user's books"""
    print(session.get('user'))
    if session.get('user'):
        user_id = session['user']
        label = request.json.get("label")
        book = request.json.get("book")
        print("999999999999999999", "label:", label, "book:", book, "99999999999999999999999999")
        
        if book['volumeInfo']['industryIdentifiers'][0]['type'] == 'ISBN_13': 
            isbn = book['volumeInfo']['industryIdentifiers'][0].get('identifier')
        else:
            isbn = book['volumeInfo']['industryIdentifiers'][1].get('identifier')

        the_book = crud.get_book_by_isbn(isbn)
        this_category = crud.get_category_by_label(user_id, label)

        if not the_book:
            the_book = crud.create_book(isbn, 
                                        book['volumeInfo']['title'], 
                                        book['volumeInfo']['authors'], 
                                        book['volumeInfo']['description'], 
                                        book['volumeInfo']['pageCount'], 
                                        book['volumeInfo']['imageLinks']['thumbnail'])

        # NEED TO DO THIS - to make sure a book doesn't get added to a category twice
        # elif the_book in crud.get_all_books_in_category(user_id, label):
        #     return jsonify ({'error': f'{the_book.title} is already in your {this_category.label} books'})

        added_books = crud.create_book_category(the_book, this_category)
        # Right now, added_books is a list of all of the book objects in this_category
        
        return jsonify ({'success': f'{the_book.title} has been added to {this_category.label} books'})
        # 'books_in_category': added_books




if __name__ == '__main__':
    connect_to_db(app, 'testbookworm')
    app.run(host='0.0.0.0', debug=True)