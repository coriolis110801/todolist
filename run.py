from flask import Flask,jsonify,request
from  flask import  render_template
import db

app  =  Flask(
        __name__,
        template_folder='template',
		static_folder='static',
		static_url_path='/static'
        )

@app.route('/')
def  index(name=None):
    data=db.listProject()
    print ("==>"+str(data))
    return  render_template('index.html',  obj=data)

@app.route('/sidebar')
def  sidebar(name=None):
    return  render_template('sidebar.html',  name=name)

@app.route('/main')
def main(name=None):
    return  render_template('main.html',  name=name)

@app.route('/addproject')
def addproject():
    return  render_template('addProject/addProject.html')


@app.route('/api/addProjectTitle',methods=["POST"])
def addProjectTitle(name=None):
    data = request.form.get('data')
    db.addProjectTitle(str(data))
    return  "OK"

@app.route('/api/addTask',methods=["POST"])
def addTask(name=None):
    data = request.form.get('data')
    pjid = request.form.get('pjid')

    
    print ("==>"+str(data)+"-"+pjid)
    db.addTask(str(data),pjid)
    return  "OK"

@app.route('/project/<id>')
def project(id=None):
    data=db.listProject()
    print ("==>"+str(data))
    lines=db.listTask(id)
    print ("==>"+str(lines))
    title=''
    for result in data:
        if(str(result['id']) == str(id)):
            title=result['title']
        print ("=====>"+title)
    return  render_template('index.html',  obj=data,lines=lines,id=id,title=title)

@app.route('/api/removeLine',methods=["POST"])
def removeLine():
    id = request.form.get('data')
    print ("==>"+str(id))
    db.removeLine(id)
    return  "OK"

@app.route('/api/editLine',methods=["POST"])
def editLine():
    data = request.form.get('data')
    id = request.form.get('id')
    db.editLine(id,data)
    return  "OK"

@app.route('/api/removePro',methods=["POST"])
def removePro():
    id = request.form.get('data')
    print ("==>"+str(id))
    db.removePro(id)
    return  "OK"
if  __name__  ==  '__main__':
    app.run(host='0.0.0.0',  debug=True)