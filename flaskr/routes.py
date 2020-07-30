from flask import render_template, flash, redirect, url_for, request
from flaskr import app, query_db
from config import Config
from datetime import datetime, timedelta, date
import os
import json

app.config.from_object(Config)

@app.before_first_request
def test():
    print(app.config["WEEKDO_DEFAULT"])
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

@app.route('/')
@app.route('/home')
def index():
    test = [1, 2, 3, 4]
    return render_template('index.html', title='home', test=test)

@app.route("/set_weekdo", methods=["POST"])
def set_weekdo():
    req = request.get_json()
    print(req)
    pass

@app.route("/get_weekdoes")
def get_weekdoes():

        
    d = {
        0 : {"todo":[], "date":"","day":"Monday", "by":[]},
        1 : {"todo":[], "date":"","day":"Tuesday", "by":[]},
        2 : {"todo":[], "date":"","day":"Wednesday", "by":[]},
        3 : {"todo":[], "date":"","day":"Thursday", "by":[]},
        4 : {"todo":[], "date":"","day":"Friday", "by":[]},
        5 : {"todo":[], "date":"","day":"Saturday", "by":[]},
        6 : {"todo":[], "date":"","day":"Sunday", "by":[]},
    }
    return json.dumps(d)


def all_sundays(year):
    d = date(year, 1, 1)                    # January 1st
    d += timedelta(days = 6 - d.weekday())  # First Sunday
    while d.year == year:
      yield d
      d += timedelta(days = 7)