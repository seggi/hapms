
# sqliteconn = sqlite3.connect('nk-hpas.sqlite')
# Query row @ Dict from 
# You must call this class when you make query in db


class NkQueryObject:
    def __init__(self, cursor):
        self.cursor = cursor

    def queryRow(self):
        columns = [desc[0] for desc in self.cursor.description]
        rowdicts = []
        for row in self.cursor.fetchall():
            newdict = {}
            for col, val in zip(columns, row):
                newdict[col] = val
            rowdicts.append(newdict)
        for rows in rowdicts: return rows

    def queryDict(self):
        columns = [desc[0] for desc in self.cursor.description]
        rowdicts = []
        for row in self.cursor.fetchall():
            newdict = {}
            for col, val in zip(columns, row):
                newdict[col] = val
            rowdicts.append(newdict)
        return rowdicts


class NkSelet(NkQueryObject):
    def __init__(self, cursor, conn):
        super().__init__(cursor)
        self.cursor = cursor
        self.conn = conn

    def selectAll(self, getsting=None): # Return list of dictionary
        self.cursor.execute(getsting)
        return self.queryDict()
    
    def selectOne(self, getsting=None): # Return one dict
        self.cursor.execute(getsting)
        return self.queryRow()

    def insertData(self, getstring=None):
        self.cursor.execute(getstring)
        self.conn.commit()
        
    def updateData(self, getsting=None):
        self.cursor.execute(getsting)
        self.conn.commit()

    def removeData(self, getstring=None):
        self.cursor.executemany(getstring)
        self.conn.commit()