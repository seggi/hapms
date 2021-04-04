import os 
import flask
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand 

from app import create_app, db  
from app.models import * 


# app = flask.Flask(__name__, )
# static_folder="../../../build", static_url_path='/'

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

@app.route('/')
def index():
    return app.send_static_file('index.html')


manager = Manager(app)
migrate = Migrate(app, db)

def make_shell_content():
    return dict(
        app=app, db=db, registerdoctor=NkRegisterDoctor,
        receivedrequest=NkReceivedRequest,
        doctoravailabilit=NkDoctoravailability,
        responsedrequest=NKResponsedRequest
    )
    
manager.add_command("shell", Shell(make_context=make_shell_content))
manager.add_command('db', MigrateCommand)

if __name__=='__main__':
    # manager.run()
    app.run()