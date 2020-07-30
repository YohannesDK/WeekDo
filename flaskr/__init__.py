from flask import Flask , g
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from config import Config
import os

import sqlite3

app = Flask(__name__)

app.config.from_object(Config)
scheduler = BackgroundScheduler()

CORS(app, resources={r'/*': {'origins': '*'}})

def get_db():
    db = getattr(g, '_database', None)
    
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
    
    db.row_factory = sqlite3.Row
    return db

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def query_db(query, args=() , one=False):
    db = get_db()
    cursor = db.execute(query, args)
    rv = cursor.fetchall()
    cursor.close()
    db.commit()
    return (rv if rv else None) if one else rv


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# initialize db if it does not exist
if not os.path.exists(app.config['DATABASE']):
    init_db()

from flaskr import routes