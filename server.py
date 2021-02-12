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
        crud.create_user(first_name, last_name, email, password, city, state)
        return jsonify ({'status': '200',
                        'message': 'Account has successfully been created'})

@app.route('/api/login', methods=["POST"])
def log_in_user():
    """Log a user in and show them they were successful or not."""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if user:
            if user.password == password:
                session["user"] = user.id
                return jsonify ({'status': '200',
                                'message': 'Successfully logged in',
                                'user_id': user.id})
            else:
                return jsonify ({'status': '404',
                                'message': 'Incorrect Password'})
    else:
        return jsonify ({'status': '400',
                        'message': 'User does not exist'})



if __name__ == '__main__':
    connect_to_db(app, 'bookworm')
    app.run(host='0.0.0.0', debug=True)