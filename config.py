from datetime import time
class Config(object):
    DATABASE = 'database.db'
    WEEKDO_DEFAULT = {
        0 : {"todo":[], "date":"2020-08-03","day":"Monday", "by":[""], "done": [], "ids":[]},
        1 : {"todo":[], "date":"2020-08-04","day":"Tuesday", "by":[],"done": [], "ids":[]},
        2 : {"todo":[], "date":"2020-08-05","day":"Wednesday", "by":[],"done": [], "ids":[]},
        3 : {"todo":[], "date":"2020-08-06","day":"Thursday", "by":[], "done": [], "ids":[]},
        4 : {"todo":[], "date":"2020-08-07","day":"Friday", "by":[], "done": [], "ids":[]},
        5 : {"todo":[], "date":"2020-08-08","day":"Saturday", "by":[], "done": [], "ids":[]},
        6 : {"todo":[], "date":"2020-08-09","day":"Sunday", "by":[], "done": [], "ids":[]},
    }
    YEAR = None
    ALL_SUNDAYS = []
    DELETE_TIME = time(23, 59)