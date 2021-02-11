"""Script to seed database"""

import os
import json

import crud
import model
import server
from random import choice

os.system('dropdb bookworm')
os.system('createdb bookworm')

model.connect_to_db(server.app)
model.db.create_all()


#create fake books for testing
new_books = []

for n in range(10):
    isbn = f'testing12345{n}'
    title = f'Test Title Book {n}'
    author = f'Test Author Book {n}'
    description = f'Test overview for book {n}'
    page_length = n
    image = f'Test image path {n}'

    new_book = crud.create_book(isbn, title, author, description, page_length, 
                                image)

    new_books.append(new_book)


#create fake users for testing
new_users = []

for n in range(10):
    first_name = f'Test User {n}'
    last_name = f'Test User {n}'
    email = f'user{n}@test.com'  
    password = 'test'

    new_user = crud.create_user(first_name, last_name, email, password)

    new_users.append(new_user)

    # Create fake user_books for testing
    new_user_books = []
    for n in range(4):
        random_book = choice(new_books).isbn
        user_id = new_user.id
        new_user_book = crud.create_user_book(random_book, user_id)
        new_user_books.append(new_user_book)

# Create fake events for testing
new_events = []

for n in range(10):

    host_id = n + 1
    city = f'City {n}'
    state = f'S{n}'
    start_datetime = f'2021-02-0{n+1} 19:00'
    end_datetime = f'2021-02-0{n+1} 21:00'

    new_event = crud.create_event(host_id, city, start_datetime, end_datetime, state)

    new_events.append(new_event)

    # Create fake user_events for testing
    for n in range(4):
        random_user = choice(new_users).id
        event_id = new_event.id
        new_user_event = crud.create_user_event(random_user, event_id)

        # Create fake event_books for testing
        random_book = choice(new_books).isbn
        new_event_book = crud.create_event_book(random_book, event_id)


# Create fake categories for testing
new_categories = []

for n in range(10):

    user_id = n + 1
    label = f'Category {n}'

    new_category = crud.create_category(user_id, label)

    new_categories.append(new_category)

    # Create fake user_book_categories for testing
    for n in range(4):
        random_user_book = choice(new_user_books).id
        category_id = new_category.id
        new_user_book_category = crud.create_user_book_category(random_user_book,
                                                                 category_id)