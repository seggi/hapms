import sqlite3
from . import mysqldb as mysql

# SQLite connection if offline(working)

# sqliteconn = sqlite3.connect('nk-hpas.sqlite')

# MYSQL connection if online(Working)

mysqlconn =  mysql.connect()