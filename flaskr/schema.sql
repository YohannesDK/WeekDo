-- DROP TABLE IF EXISTS [weekdo];

CREATE TABLE weekdo(
    todo_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL,
    test VARCHAR(10) NOT NULL,
    creation_time DATETIME
)

