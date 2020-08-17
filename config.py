import os
from datetime import time
class Config(object):
    DATABASE = 'database.db'
    DATABASE_URL="sqlite:///database.db"
    WEEKDO_DEFAULT = {
        0 : {"todo":[], "date":"","day":"Monday", "by":[], "done": [], "ids":[]},
        1 : {"todo":[], "date":"","day":"Tuesday", "by":[],"done": [], "ids":[]},
        2 : {"todo":[], "date":"","day":"Wednesday", "by":[],"done": [], "ids":[]},
        3 : {"todo":[], "date":"","day":"Thursday", "by":[], "done": [], "ids":[]},
        4 : {"todo":[], "date":"","day":"Friday", "by":[], "done": [], "ids":[]},
        5 : {"todo":[], "date":"","day":"Saturday", "by":[], "done": [], "ids":[]},
        6 : {"todo":[], "date":"","day":"Sunday", "by":[], "done": [], "ids":[]},
    }
    PASSWORD = "yoyoweekdo98"
    PASSWORD_ENTERED = False
    YEAR = None
    ALL_SUNDAYS = []
    WEEKDATES = []
    DELETE_TIME = time(23, 59)