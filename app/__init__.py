
from flask import Flask, flash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from flask_cors import CORS
from dotenv import load_dotenv
from flask_login import LoginManager
from flask_cors import cross_origin



db = SQLAlchemy()
migrate = Migrate()
load_dotenv()


def create_app():
    app = Flask(__name__, static_folder='../tracking-nutrition-frontend/build', static_url_path='/')

    CORS(app)
    app.config['SECRET_KEY'] = os.environ.get("APP_SECRET_KEY")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI")

    # import models here for Alembic setup
    from app.models.record import Record
    from app.models.user import User
    
    # hooking app with db and migrate
    db.init_app(app)
    migrate.init_app(app, db)

    #import Blueprint
    from app.routes.proxy import proxy_bp
    from app.routes.records import records_bp
    from app.routes.users import users_bp

    # register Blueprint
    app.register_blueprint(proxy_bp)
    app.register_blueprint(records_bp)
    app.register_blueprint(users_bp)

    # https://flask-login.readthedocs.io/en/latest
    login_manager = LoginManager()
    login_manager.login_view = 'google_oauths.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(login_id):
        users = User.query.all()
        for user in users:
            if user.login_id == login_id:
                return user
        return flash("User is not login")
        
    @app.route('/')
    @cross_origin()
    def index():
        return app.send_static_file('index.html')

    @app.errorhandler(404)
    @cross_origin()
    def not_found(e):
        return app.send_static_file('index.html')
    
    return app
