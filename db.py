import pymysql
from flask import jsonify

#mysql://b5abb7d97470c2:56d1dbb9@eu-cdbr-west-01.cleardb.com/heroku_a167b033ac8cec5?reconnect=true
MYSQL_CONFIG = {
    'host': 'eu-cdbr-west-01.cleardb.com',  # IP地址
    'port': 3306,  # 端口
    'user': 'b5abb7d97470c2',  # 用户名
    'passwd': '56d1dbb9',  # 密码
    'db': 'heroku_a167b033ac8cec5',  # 数据库
    'charset': 'utf8',  # 编码
}

conn = pymysql.connect(**MYSQL_CONFIG)  # 数据库连接
cur = conn.cursor()  # 游标对象

print (conn)
print (type(conn))


def addTask(data,pjid):
    sql = "INSERT INTO `user`( `data`,`pjid`) VALUES ('"+str(data)+"','"+pjid+"')"
    n = cur.execute(sql) # 执行后得到数据的条数'
    print('sqladdTask执行成功')
    conn.commit()   


def addProjectTitle(data):
    sql = "INSERT INTO `project`( `title`) VALUES ('"+str(data)+"')"
    n = cur.execute(sql) # 执行后得到数据的条数'
    print('sqladdTask执行成功')
    conn.commit()  

def removeLine(id):
    sql = "delete from `user` where id = "+id+""
    n = cur.execute(sql) # 执行后得到数据的条数'
    print('sqladdTask执行成功')
    conn.commit()   

def removePro(id):
    sql = "delete from `project` where id = "+id+""
    n = cur.execute(sql) # 执行后得到数据的条数'
    print('sqladdTask执行成功')
    conn.commit()   

def listProject():
    sql = "SELECT id,title FROM project"
    n = cur.execute(sql) 
    rv = cur.fetchall() 
    payload = []

    for result in rv:
       content = {'id': result[0],'title': result[1]}
       payload.append(content)
       content = {}
    return payload
def editLine(id,data):
    sql = "update  `user` set data='"+str(data)+"' where id = "+id+""
    n = cur.execute(sql) # 执行后得到数据的条数'
    print('sqladdTask执行成功')
    conn.commit()  

def listTask(id):
    sql = "SELECT id,data,date_format (ctime,'%Y-%m-%d %H:%i:%s')ctime FROM user where pjid = "+id
    n = cur.execute(sql) # 执行后得到数据的条数'
    # for i in range(n):
    #     info = cur.fetchone()
    #     print(f'--这是第{i + 1}条数据--'+str(info))
    rv = cur.fetchall() # 取所有数据
    payload = []

    for result in rv:
       content = {'id':result[0],'data': result[1],'ctime': result[2]}
       payload.append(content)
       content = {}
    return payload

