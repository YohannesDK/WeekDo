# WeekDo
Scheduler for each weak, with todo effect! Each sunday i will make my weakly schedule! 

## Application structure
   ```
      /WeekDo
         ├── flaskr/
         │   ├── __init__.py
         │   ├── routes.py
         │   ├── schema.sql
         │   ├── templates/
         │   │   |── index.html
         │   |── static/
         │   │   ├── css/
         │   │   │   ├── style.css
         │   │   ├── js/
         │   │   │   ├── app.js
         │   │   │   ├── weekdo.js 
         │   │   │   ├── components/
         │   │   │   │   ├── weekdocomponent.js
         │   │   │   │   ├── main.js
         ├── venv/
         ├── database.db
         ├── config.py
         ├── requirements.txt
         ├── README.md
         └── weekdo.py
   ```
## What do we need?
    * Backend: Python
        * Database: Sqlite3
            * Learn how to work Sqllite3
            * Setup the tables so we have one todo at each row, with date, and timetocomplete
            * Manipulate data by date, so if todoes have same date, then we group them togerher in a list
        * Flask

    * Frontend: HTML, CSS, Vue(? Component sharing)

