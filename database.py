import pyodbc
import pypyodbc

global dbConnection
global cursor


class databaseConnection:
    def __init__(self):
        pass

# connect to database
    def openDbConnection(self):
        try:
            dbConnection = connection = pyodbc.connect('Driver={SQL Server};'
            'Server=<servername>'
            'Database=<databasename>;'
            'Trusted_Connection=yes;')

            if dbConnection.getinfo != None:
                cursor = dbConnection.cursor()
            return cursor

        except Exception as e:
            print("Error while connecting to DB", e)

    # close datbase connection


    def closeDbConnection(self):
        if dbConnection.getinfo != None:
            cursor.close()
            dbConnection.close()
            print("db connection closed")

d= databaseConnection()

d.openDbConnection()
