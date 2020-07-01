# WeekDo
Scheduler for each weak, with todo effect! Each sunday i will make my weakly schedule! 

## Application structure
   ```
      /WeekDo
         ├── flaskr/
         │   |── static/
         │   |   ├── templates/
         │   │   │   |── index.html
         │   │   ├── css/
         │   │   │   ├── style.css
         │   │   ├── js/
         │   │   │   ├── app.js
         │   │   │   ├── weekdo.js 
         │   │   │   ├── components/
         │   │   │   │   ├── weekdocomponent.js
         │   │   │   │   ├── setweekdo.js
         │   ├── __init__.py
         │   ├── schema.sql
         ├── venv/
         └── setup.py
   ```
## What do we need?
    * Backend: Python
        * Database: Sqlite3 (because it is just a file, dont need a running server to drive it)
        * Flask

    * Frontend: HTML, CSS, Vue(? Component sharing)

