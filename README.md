Bookworm
======

Bookworm is a  book database that gives avid readers the ability to search for, store, and categorize books from the GoogleBooks API into a personal bookshelf. Users can create and attend book club events, where all attendees can suggest books from their shelves, read further information about each suggested book, and ultimately vote on the book to read. The current vote count for each book is displayed to all attendees, and when voting is stopped, the book with the most votes is the one that remains.

Table of Contents
------

[Tech Stack](#tech-stack)

[Features](#features)

[Installation](#installation)



Tech Stack
------

| <!-- -->    | <!-- -->    |
|:-------------|:-------------|
| **Backend**      | Python, SQLAlchemy, Flask |
| **Frontend**     | JavaScript, React, Fetch, HTML, CSS, React-Bootstrap |
| **Database**     | PostgreSQL |
| **APIs**         | Google Books |
| <!-- -->    | <!-- -->    |



Features
------



Installation
------
In order to use Bookworm, you will first need:
+ Python 3.6.9
+ PostreSQL 10.15

To install Bookworm:

Clone this repository:

```$ git clone https://github.com/hunterglaine/bookworm.git```

Create and activate a virtual environment:

Mac:

    $ virtualenv env
    $ source env/bin/activate

Windows:

    $ virtualenv env --always-copy
    $ source env/bin/activate

Install dependencies:

    (env) $ pip3 install -r requirements.txt

Create the database: 

    (env) $ python3 seed_database.py

Start the server:

    (env) $ python3 server.py

Now, head to `http://localhost:5000/` to start curating your bookshelf and attending book clubs!

### Happy Reading! 📚