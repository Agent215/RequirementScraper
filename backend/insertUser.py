from flask_mysqldb import MySQL
from flask import request
from flask import jsonify
from app import app
import sys

app.config['MYSQL_USER'] = 'sql9329694'
app.config['MYSQL_PASSWORD'] = '9lDUwG3eJI'
app.config['MYSQL_HOST'] = 'sql9.freemysqlhosting.net'
app.config['MYSQL_DB'] = 'sql9329694'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

def insertUser():
    e = None
    cur = mysql.connection.cursor()
    TU_ID = request.json['username']
    passW =request.json['password']
	#get a list of current user in the database
    user_list = read_db()
    try:
        if(TU_ID in user_list):
            print("Users in db exists")
            return 'Not inserted'
        else:
            cur.execute("INSERT INTO Users(TU_ID, password) VALUES (%s, %s)", (TU_ID, passW))
            mysql.connection.commit()
        cur.close()
    except:
        print('error here')
		
    id = TU_ID	
    return jsonify({ "user_id": id, "error": e })


def read_db():
    cur = mysql.connection.cursor()
    select_ID_query = 'SELECT TU_ID FROM Users'
    cur.execute(select_ID_query)
    records = cur.fetchall()
    #print("Total number of rows: ", cur.rowcount)
    id_list = []
    for row in records:
        #print(row.get('TU_ID'))
        id_list.append(row.get('TU_ID'))
    #print(id_list) #get the list of unique id
    cur.close()	
    return id_list

if __name__ == "__main__":
    print(insertUser())