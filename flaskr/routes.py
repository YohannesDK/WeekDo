from flask import render_template, flash, redirect, url_for, request
from flaskr import app, query_db
from datetime import datetime
import os
import json




@app.before_first_request
def test():
    a = 3
    while a > 0:
        print("\n", "running", "\n")
        a -= 1

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