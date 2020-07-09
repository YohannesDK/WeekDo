# WeekDo
Scheduler for each weak, with todo effect! Each sunday i will make my weakly schedule! 

## Application structure
   ```
      /WeekDo
         ├── flaskr/
         │   ├── __init__.py
         │   ├── database.db
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
         │   │   │   │   ├── setweekdo.js
         │   │   │   │   ├── main.js
         ├── venv/
         ├── config.py
         ├── requirements.txt
         ├── README.md
         └── weekdo.py
   ```
## What do we need?
    * Backend: Python
        * Database: Sqlite3 (because it is just a file, dont need a running server to drive it)
        * Flask

    * Frontend: HTML, CSS, Vue(? Component sharing)

