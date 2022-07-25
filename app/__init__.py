from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from flask_cors import CORS
from dotenv import load_dotenv
db = SQLAlchemy()
migrate = Migrate()
load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI")

    # import models here for Alembic setup
    #from app.models.record import Record
    #from app.models.user import User
    
    # hooking app with db and migrate
    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)
    return app