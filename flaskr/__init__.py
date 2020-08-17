from flask import Flask , g
from flask_cors import CORS
from config import Config
from datetime import datetime, timedelta, date, time
import os

import sqlite3

app = Flask(__name__)
app.config.from_object(Config)

def init_year_and_sundays():
    set_year()
    if len(app.config['ALL_SUNDAYS']) == 0:
        for sunday in all_sundays(int(app.config["YEAR"])):
            app.config['ALL_SUNDAYS'].append(sunday)
    #region hidethis
    # print(app.config["WEEKDO_DEFAULT"])
    # query_db('DELETE FROM dates;', one=True)
    # for day in days:
    #     query_db('INSERT INTO dates (date_id, dato) VALUES (?,?);', (day, days[day]))

    # check_query = query_db('SELECT * FROM dates;', one=True)
    # print(check_query)
    # if check_query != None:
    #     for i in check_query:
    #         print(i[0], i[1], "her")
    
    # print("\n")
    # dt = datetime.today()
    # for i in all_sundays(dt.year):
    #     print(i)
    #endregion 

def all_sundays(year):
    d = date(year, 1, 1)                    # January 1st
    d += timedelta(days = 6 - d.weekday())  # First Sunday
    while d.year == year:
      yield d
      d += timedelta(days = 7)

def set_year():
    if app.config['YEAR'] == None:
        app.config['YEAR'] = str(date.today().year)
    elif int(app.config['YEAR']) < date.today().year:
        app.config['YEAR'] = str(date.today().year)
        app.config['ALL_SUNDAYS'] = []

# CORS(app, resources={r'/*': {'origins': '*'}})

def get_db():
    db = getattr(g, '_database', None)
    
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE_URL'])
    
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
if not os.path.exists(app.config['DATABASE_URL']):
    init_db()

if app.config['YEAR'] == None:
    init_year_and_sundays()

from flaskr import routes