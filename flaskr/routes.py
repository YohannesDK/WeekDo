from flask import render_template, flash, redirect, url_for, request
from flaskr import app, query_db
from config import Config
from datetime import datetime, timedelta, date
import os
import json

days = {
    0: 'man',
    1: 'tirs',
    2: 'ons',
    3: 'tors',
    4: 'fre',
    5: 'lør',
    6: "søn"
}

@app.before_first_request
def testing():
    # for day in days:
    # query_db('INSERT INTO dates (dato) VALUES (?);', (days[0],))
    # query_db('INSERT INTO weekdoes (todo, timeToComplete, d_id, done) VALUES (?,?,?,?);', ('ring mamma', '12:11',0,0))
    # weekdoes = query_db('SELECT * FROM weekdoes')
    # query_db('DELETE FROM weekdoes')

    # check_query = query_db('SELECT * FROM dates;', one=True)
    # if check_query != None:
    #     for i in check_query:
    #         print(i['date_id'], i['dato'] )
    # else:
    #     print(check_query)

    # print("\n")
    # query_db('DELETE FROM dates;', one=True)
    pass

@app.route('/')
@app.route('/home')
def index():
    test = [1, 2, 3, 4]
    return render_template('index.html', title='home', test=test)

@app.route("/set_weekdo", methods=["POST"])
def set_weekdo():
    if request.method == 'POST':
        print("Method is post")
        req = request.get_json()

        print("\n")
        print(req)
        print("\n")
        # print(req['new_todo'], req['new_byy'])
        # query_db('INSERT INTO weekdoes (todo, timeToComplete, d_id, done) VALUES (?,?,?,?);', req[""])
    else:
        print("Something went wrong")
    return redirect("/get_weekdoes")

@app.route("/get_weekdoes")
def get_weekdoes():
    # print(app.config["ALL_SUNDAYS"])
    # print(app.config["DELETE_TIME"])
    weekdoes = query_db('SELECT * FROM weekdoes')
    print("\n")
    print(weekdoes)
    # for i in weekdoes:
    #     print(i['todo_id'], i['todo'],i['todo'], i['timeTocomplete'], i['done'] == True)
    # print("\n")

    return json.dumps(app.config['WEEKDO_DEFAULT'])
