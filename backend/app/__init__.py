from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager  
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flaskext.mysql import MySQL
from flask_login import LoginManager


from config import config


db = SQLAlchemy()
cors = CORS()
jwt = JWTManager()
mysqldb =  MySQL()
login_manager = LoginManager()


# db = SQLAlchemy()
# cors = CORS()
# jwt = JWTManager()
# login_manager = LoginManager()

def create_app(config_name):
    app = Flask(__name__, static_folder='../../build', static_url_path='/')
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    login_manager.session_protection = 'strong'
    login_manager.login_view ="auth.login"
    
    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    mysqldb.init_app(app)
    login_manager.init_app(app)

    from .models import NkRegisterDoctor

    @login_manager.user_loader
    def load_user(user_id):
        return NkRegisterDoctor.query(int(user_id))


    from . auth import auth as auth_blueprint
    from . main import main as main_blueprint

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(main_blueprint, url_prefix='/main')

    return app