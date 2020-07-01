# WeekDo
Scheduler for each weak, with todo effect! Each sunday i will make my weakly schedule! 

## Application structure
   ```
      /WeekDo
         ├── flaskr/
         │   ├── templates/
         │   │   ├── index.html
         │   |── static/
         │   │   ├── css/
         │   │   │   ├── style.css
         │   │   ├── js/
         │   │   │   ├── app.js
         │   │   │   ├── weekdo.js 
         │   │   │   ├── components/
         │   │   │   ├── ├── weekdocomponent.js
         │   │   │   ├── ├── setweekdo.js
         │   ├── __init__.py
         │   ├── db.py
         │   ├── schema.sql
         │   ├── auth.py
         │   ├── blog.py
         ├── tests/
         │   ├── conftest.py
         │   ├── data.sql
         │   ├── test_factory.py
         │   ├── test_db.py
         │   ├── test_auth.py
         │   └── test_blog.py
         ├── venv/
         ├── setup.py
         └── MANIFEST.in
   ```
## What do we need?
    * Backend: Python
        * Database: Sqlite3 (because it is just a file, dont need a running server to drive it)
        * Flask

    * Frontend: HTML, CSS, Vue(? Component sharing)

