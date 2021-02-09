"""Server for Bookword app."""

from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = 'BD647hgfyetEHU789hfehd9svsru5HwgYkghjwrfishvs'




if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)