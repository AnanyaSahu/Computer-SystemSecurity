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
            'Server=ANNA\MSSQLSERVER03;'
            'Database=flashMessage;'
            'Trusted_Connection=yes;')
                        

            # dbConnection = connection = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
            # 'Server=sqlpython.centralindia.cloudapp.azure.com;'
            # 'Database=master;'
            # 'encrypt=yes;'
            # 'TrustServerCertificate=yes;'
            # 'UID=sa;'
            # 'PWD=Sqlserver@123',autocommit = True)
            # connection.close()

            # dbConnection=connection = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
            # 'Server=sqlpython.centralindia.cloudapp.azure.com;'
            # 'Database=FlashMessages;'
            # 'encrypt=yes;'
            # 'TrustServerCertificate=yes;'
            # 'UID=sa;'
            # 'PWD=Sqlserver@123',autocommit = True)
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
