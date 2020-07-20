from flask import render_template, flash, redirect, url_for, request
from flaskr import app, query_db
from datetime import datetime, timedelta, date
import os
import json

days = {
    0 : "mandag",
    1 : "tirsdag",
    2 : "onsdag",
    3 : "torsdag",
    4 : "fredag",
    5 : "lørdag",
    6 : "søndag"
}


@app.before_first_request
def test():
    # query_db('DELETE FROM dates;', one=True)
    # for day in days:
    #     query_db('INSERT INTO dates (date_id, dato) VALUES (?,?);', (day, days[day]))

    check_query = query_db('SELECT * FROM dates;', one=True)
    if check_query != None:
        for i in check_query:
            print(i[0], i[1])
    
    print("\n")
    dt = datetime.today()
    for i in all_sundays(dt.year):
        print(i)

@app.route('/')
@app.route('/home')
def index():
    test = [1, 2, 3, 4]
    return render_template('index.html', title='home', test=test)

@app.route("/set_weekdo", methods=["POST"])
def set_weekdo():
    pass

@app.route("/get_weekdoes")
def get_weekdoes():
        
    d = {
        0 : {"todo":['Ring mamma', 'Lag 1', 'Lag 1'], "date":"06-13-2019","day":"6", "by":['12:21', '12:54', '13:00']},
        1 : {"todo":['Ring pappa'], "date":"06-13-2019","day":"7", "by":["12:22"]},
        2 : {"todo":['Ring fdhjka'], "date":"06-13-2019","day":"8", "by":["12:21"]},
        3 : {"todo":['Ring akdjaldk'], "date":"06-13-2019","day":"9", "by":["12:04"]},
        4 : {"todo":['Ring akjdalskj'], "date":"06-13-2019","day":"10", "by":["12:34"]}
    }
    return json.dumps(d)


def all_sundays(year):
    d = date(year, 1, 1)                    # January 1st
    d += timedelta(days = 6 - d.weekday())  # First Sunday
    while d.year == year:
      yield d
      d += timedelta(days = 7)