
# from flask import Blueprint, request, redirect, url_for, jsonify, abort, make_response, flash
# from app.models.user import User
# from app import db
# from app import GOOGLE_DISCOVERY_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
# from oauthlib.oauth2 import WebApplicationClient
# from flask_login import (
#     LoginManager,
#     current_user,
#     login_required,
#     login_user,
#     logout_user,
# ) 
# import requests
# import json

# # OAuth 2 client setup
# client = WebApplicationClient(GOOGLE_CLIENT_ID)

# google_bp = Blueprint("google_bp", __name__)


# # Flask-Login helper to retrieve a user from our db

# # profile need to be login
# @google_bp.route("/profile")
# @login_required
# def profile():
#     if current_user.is_authenticated:
#         return (
#             "<p>Hello, {}! You're logged in! Email: {}</p>"
#             "<div><p>Google Profile Picture:</p>"
#             '<img src="{}" alt="Google profile pic"></img></div>'
#             '<a class="button" href="/logout">Logout</a>'.format(
#                 current_user.name, current_user.email, current_user.profile_pic
#             )
#         )
#     else:
#         return redirect(url_for("login"))

# # function to retrieving Google’s provider configuration
# def get_google_provider_cfg():
#     google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
#     if not google_provider_cfg:
#         flash("Login failed!")
#     return google_provider_cfg

# # login page
# @google_bp.route("/login")
# def login():
#     # Find out what URL to hit for Google login
#     google_provider_cfg = get_google_provider_cfg()
#     authorization_endpoint = google_provider_cfg["authorization_endpoint"]

#     # Use library to construct the request for Google login and provide
#     # scopes that let you retrieve user's profile from Google
#     request_uri = client.prepare_request_uri(
#         authorization_endpoint,
#         redirect_uri=request.base_url + "/callback",
#         scope=["openid", "email", "profile"],
#     )
#     return redirect(request_uri)

# @google_bp.route("/login/callback")
# def callback():
#     # Get authorization code Google sent back to you
#     code = request.args.get("code")

#     # Find out what URL to hit to get tokens that allow you to ask for
#     # things on behalf of a user
#     google_provider_cfg = get_google_provider_cfg()
#     token_endpoint = google_provider_cfg["token_endpoint"]

#     # Prepare and send a request to get tokens! Yay tokens!
#     token_url, headers, body = client.prepare_token_request(
#     token_endpoint,
#     authorization_response=request.url,
#     redirect_url=request.base_url,
#     code=code
#     )
#     token_response = requests.post(
#     token_url,
#     headers=headers,
#     data=body,
#     auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
#     )

#     # Parse the tokens!
#     client.parse_request_body_response(json.dumps(token_response.json()))

#     # Now that you have tokens (yay) let's find and hit the URL
#     # from Google that gives you the user's profile information,
#     # including their Google profile image and email
#     userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
#     uri, headers, body = client.add_token(userinfo_endpoint)
#     userinfo_response = requests.get(uri, headers=headers, data=body)

#     # You want to make sure their email is verified.
#     # The user authenticated with Google, authorized your
#     # app, and now you've verified their email through Google!
#     if userinfo_response.json().get("email_verified"):
#         google_id = userinfo_response.json()["sub"]
#         users_email = userinfo_response.json()["email"]
#         picture = userinfo_response.json()["picture"]
#         users_name = userinfo_response.json()["given_name"]
#     else:
#         abort(make_response(jsonify({"message": "User email not available or not verified by Google."}), 400))

#     # Create a user in your db with the information provided by Google
#     new_user = User(
#                 email=users_email,
#                 name=users_name,
#                 google_id=google_id,
#                 picture=picture,
#                 user_name=None,
#                 password=None,
#                 dob=None,
#                 gender=None,
#                 height_inches=None,
#                 weight_pound=None
#             )
#     # Doesn't exist? Add it to the database.
#     if not User.get_user_oauth(google_id):
#         User.post_user_oauth(new_user)

#     # Begin user session by logging the user in
#     login_user(new_user)

#     # Send user back to homepage
#     return redirect(url_for("profile"))


# @google_bp.route("/logout")
# def logout():
#     logout_user()
#     return redirect(url_for("login"))

# from app import create_app
# from flask import Blueprint, request, redirect, url_for, jsonify, abort, make_response, flash