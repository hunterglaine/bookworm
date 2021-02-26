"""Script to seed test database"""

import os
import json

import crud
import model
import server
from random import choice

os.system("dropdb testbookworm")
os.system("createdb testbookworm")

model.connect_to_db(server.app, "testbookworm")
model.db.create_all()


#create fake books for testing
new_books = []

for n in range(10):
    isbn = f"testing12345{n}"
    title = f"Test Title Book {n}"
    author = f"Test Author {n}"
    description = f"Test overview for book {n}"
    page_length = n
    image = f"Test image path {n}"

    new_book = crud.create_book(isbn, title, author, description, page_length, 
                                image)

    new_books.append(new_book)


#create fake users for testing
new_users = []

for n in range(10):
    first_name = f"Test User First {n}"
    last_name = f"Test User Last {n}"
    email = f"user{n}@test.com"
    password = "test"

    new_user = crud.create_user(first_name, last_name, email, password)

    new_users.append(new_user)

    # # Create fake user_books for testing
    # for n in range(4):
    #     random_book = choice(new_books)
    #     user = new_user
    #     user_books = crud.create_user_book(user, random_book)

# Create fake events for testing
new_events = []

for n in range(10):

    host_id = n + 1
    city = f"City {n}"
    state = f"S{n}"
    event_date = f"2021-02-1{n}"
    start_time = f"1{n}:00"
    end_time = f"20:1{n}"

    new_event = crud.create_event(host_id, city, event_date, start_time, end_time, state)

    new_events.append(new_event)

    # Create fake user_events for testing
    for n in range(4):
        random_user = choice(new_users)
        event = new_event
        crud.create_user_event(random_user.id, event.id)

        # Create fake event_books for testing
        random_book = choice(new_books)
        crud.create_event_book(event, random_book)


# Create fake categories for testing
new_categories = []

for n in range(10):

    user_id = n + 1
    for i in range(10):
        label = f"Category {i}"

        new_category = crud.create_category(user_id, label)

        new_categories.append(new_category)

    # Create fake book_categories for testing
        for n in range(1,10):
            random_book = choice(new_books)
            category = new_category
            book_categories = crud.create_book_category(random_book, category)
