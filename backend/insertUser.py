from flask_mysqldb import MySQL
from flask import request
from app import app

app.config['MYSQL_USER'] = 'sql9329694'
app.config['MYSQL_PASSWORD'] = '9lDUwG3eJI'
app.config['MYSQL_HOST'] = 'sql9.freemysqlhosting.net'
app.config['MYSQL_DB'] = 'sql9329694'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

def insertUser():

    cur = mysql.connection.cursor()
    TU_ID = request.json['username']
    passW =request.json['password']
    # TODO we should check if userId is already taken
    cur.execute("INSERT INTO Users(TU_ID, password) VALUES (%s, %s)", (TU_ID, passW))
    mysql.connection.commit()
    cur.close()
    return 'successfully inserted user data into database'

if __name__ == "__main__":
    print(insertUser())