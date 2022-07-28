from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from flask_cors import CORS
from dotenv import load_dotenv
from flask_login import LoginManager



db = SQLAlchemy()
migrate = Migrate()
load_dotenv()

# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI")

    app.secret_key = os.environ.get("APP_SECRET_KEY")
    


    # https://flask-login.readthedocs.io/en/latest
    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.get(user_id)

    # import models here for Alembic setup
    from app.models.record import Record
    from app.models.user import User
    
    # hooking app with db and migrate
    db.init_app(app)
    migrate.init_app(app, db)

    #import Blueprint
    from app.routes.proxy import proxy_bp
    from app.routes.google_oauths import google_bp

    # register Blueprint
    app.register_blueprint(proxy_bp)
    app.register_blueprint(google_bp)

    CORS(app)
    return app