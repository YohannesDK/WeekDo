from flask import render_template, flash, redirect, url_for, request
from flaskr import app, query_db
from config import Config
from datetime import datetime, timedelta, date
import pprint
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
        query_db('INSERT INTO dates (dato) VALUES (?);', (req['dato'], ))
        last_date = query_db('SELECT * FROM dates WHERE date_id=(SELECT max(date_id) FROM dates)')
        if len(last_date) > 0:
            d_id = last_date[0]["date_id"]
        query_db('INSERT INTO weekdoes (todo, timeToComplete, d_id, card_id, done) VALUES (?,?,?,?,?);', (req["new_todo"], req["new_byy"], d_id, int(req["card_id"]), 0,))
        print("\n")
        print(req)
        print("\n")
    else:
        print("Something went wrong")
    return redirect("/get_weekdoes")

@app.route("/check_password", methods=["POST"])
def check_password():
    if request.method == "POST":
        req = request.get_json()
        if req['password'] == app.config["PASSWORD"]:
            return json.dumps(True)
        else:
            return json.dumps(False)

@app.route("/check_last_entered", methods=["POST"])
def check_last_entered():
    if request.method == "POST":
        if app.config["PASSWORD_ENTERED"]:
            app.config["PASSWORD_ENTERED"] = not app.config["PASSWORD_ENTERED"]
            return json.dumps(True)
        else:
            app.config["PASSWORD_ENTERED"] = not app.config["PASSWORD_ENTERED"]
            return json.dumps(False)

@app.route("/password_entered_default")
def set_password_entered_to_false():
    app.config['PASSWORD_ENTERED'] = False
    print("yez boyy")

@app.route("/get_weekdoes")
def get_weekdoes():
    weekdoes = query_db('SELECT * FROM weekdoes')
    empty_weekdo_default()
    get_all_days_of_week()
    clear_all_and_update()

    if len(weekdoes) > 0:
        for i in weekdoes:
            app.config['WEEKDO_DEFAULT'][i['card_id']]['todo'].append(i['todo'])
            app.config['WEEKDO_DEFAULT'][i['card_id']]['by'].append(i['timeToComplete'])
            app.config['WEEKDO_DEFAULT'][i['card_id']]['done'].append(i['done'])
            app.config['WEEKDO_DEFAULT'][i['card_id']]['ids'].append(i['todo_id'])
            app.config['WEEKDO_DEFAULT'][i['card_id']]['date'] = query_db('SELECT * FROM dates WHERE date_id=?', (i['d_id'], ))[0]["dato"]

    # pp.pprint(app.config['WEEKDO_DEFAULT'])
    return json.dumps(app.config['WEEKDO_DEFAULT'])

@app.route("/clear_all")
def clear_all_sunday():
    query_db('DELETE FROM dates')
    query_db('DELETE FROM weekdoes')
    empty_weekdo_default()
    get_all_days_of_week()
    clear_all_and_update()
    return redirect("/get_weekdoes")

def printandsee():
    print("datebase innhold")
    weekdoes = query_db('SELECT * FROM weekdoes')
    dates = query_db('SELECT * FROM dates')
    print("\n")
    for i in weekdoes:
        print(i['todo_id'], i['todo'], i['timeTocomplete'],i['d_id'],i['card_id'], i['done'])
    print("\n")
    for i in dates:
        print(i["date_id"], i["dato"])

def empty_weekdo_default():
    for i in app.config['WEEKDO_DEFAULT']:
        ele = app.config['WEEKDO_DEFAULT'][i]
        ele['todo'].clear()
        ele['by'].clear()
        ele['done'].clear()
        ele['ids'].clear()
        ele['date'] = ""

def get_all_days_of_week():
    # Starts with knowing the day of the week
    week_day=datetime.now().isocalendar()[2]
    # Calculates Starting date (Sunday) for this case by subtracting current date with time delta of the day of the week
    start_date=datetime.now() - timedelta(days=week_day)

    # Prints the list of dates in a current week
    dates=[str((start_date + timedelta(days=i)).date()) for i in range(8)]
    app.config['WEEKDATES'] = dates[1:]

def clear_all_and_update():
    if app.config['WEEKDO_DEFAULT'][6]['date'] == "":
        if len(app.config['WEEKDATES']) > 0:
            dates = app.config['WEEKDATES']
        else:
            dates = get_all_days_of_week()
        for day in range(len(dates)):
            ele = dates[day]
            app.config['WEEKDO_DEFAULT'][day]['date'] = ele
