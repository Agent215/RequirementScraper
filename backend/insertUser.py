from flask_mysqldb import MySQL
from flask import request
from flask import jsonify
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
    #check if TU_ID is already taken
    cur.execute("SELECT TU_ID FROM Users WHERE TU_ID = %s",(TU_ID,))
    id = cur.lastrowid
    if (id == None):
        # if we cant find that id, then let take the input and insert as new database row
        cur.execute("INSERT INTO Users(TU_ID, password) VALUES (%s, %s)", (TU_ID, passW))
        id = cur.lastrowid
    mysql.connection.commit()
    cur.close()
    return jsonify({ "user_id": id, "error": None })

if __name__ == "__main__":
    print(insertUser())