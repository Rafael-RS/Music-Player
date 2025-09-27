#/usr/bin/env python
# -*- Coding: UTF-8 -*-

import datetime
from pydal import DAL, Field

def model():
    dbinfo = 'mysql:// root:password@ 192.168.0.105: 3606/ fplayer'
    folder = "./database"

    db = DAL(dbinfo, folder=folder, poolsize=1)
    table(db)
    return db