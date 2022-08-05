
from flask import Flask, flash
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
# GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
# GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
# GOOGLE_DISCOVERY_URL = (
#     "https://accounts.google.com/.well-known/openid-configuration"
# )


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = os.environ.get("APP_SECRET_KEY")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI")

    
    
    #os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'



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
        
    
    return app



# from flask import Flask, render_template, url_for, redirect
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# import os
# from flask_cors import CORS
# from dotenv import load_dotenv
# from flask_login import LoginManager
# from authlib.integrations.flask_client import OAuth



# db = SQLAlchemy()
# migrate = Migrate()
# load_dotenv()

# # # Configuration
# # GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
# # GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
# # GOOGLE_DISCOVERY_URL = (
# #     "https://accounts.google.com/.well-known/openid-configuration"
# # )


# def create_app():
#     app = Flask(__name__)
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#     app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
#         "SQLALCHEMY_DATABASE_URI")

#     app.secret_key = os.environ.get("APP_SECRET_KEY")
#     #app.config['SERVER_NAME'] = 'http://127.0.0.1:5000'
    
#     # initialize OAuth
#     oauth = OAuth(app)

#     # https://flask-login.readthedocs.io/en/latest
#     login_manager = LoginManager()
#     login_manager.init_app(app)

#     @login_manager.user_loader
#     def load_user(user_id):
#         return User.get(user_id)

#     # import models here for Alembic setup
#     from app.models.record import Record
#     from app.models.user import User
    
#     # hooking app with db and migrate
#     db.init_app(app)
#     migrate.init_app(app, db)

#     #import Blueprint
#     from app.routes.proxy import proxy_bp
#     #from app.routes.google_oauths import google_bp

#     # register Blueprint
#     app.register_blueprint(proxy_bp)
#     #app.register_blueprint(google_bp)

#     @app.route('/')
#     def index():
#         return render_template('index.html')
    
#     @app.route('/google/')
#     def google():
    
#         # Google Oauth Config
#         # Get client_id and client_secret from environment variables
#         # For developement purpose you can directly put it
#         # here inside double quotes
#         GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
#         GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
        
#         CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
#         oauth.register(
#             name='google',
#             client_id=GOOGLE_CLIENT_ID,
#             client_secret=GOOGLE_CLIENT_SECRET,
#             server_metadata_url=CONF_URL,
#             client_kwargs={
#                 'scope': 'openid email profile'
#             }
#         )
        
#         # Redirect to google_auth function
#         redirect_uri = url_for('google_auth', _external=True)
#         return oauth.google.authorize_redirect(redirect_uri)
    
#     @app.route('/google/auth')
#     def google_auth():
#         token = oauth.google.authorize_access_token()
#         user = oauth.google.parse_id_token(token)
#         print(" Google User ", user)
#         return redirect('/')

#     CORS(app)
#     return app

