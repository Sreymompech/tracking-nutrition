
from flask import Blueprint, request, jsonify, abort, make_response
from app.models.user import User
from app import db
from datetime import datetime
from sqlalchemy import asc, desc

users_bp = Blueprint("users", __name__, url_prefix="/users")

# update user profile by id
@users_bp.route("/<user_id>", methods=["PACTH", "PUT", "POST"])
def post_user_porfile(user_id):
    chosen_user = get_user_or_abort(user_id)
    request_body = request.get_json()
    if "name" not in request_body or "dob" not in request_body or "gender" not in request_body \
        or "heigt_inches" not in request_body or "weight_pond" not in request_body \
        or "picture" not in request_body:
        return jsonify({"details": "Invalid data"}), 400

    height_split = list(request_body["height_inches"])
    height_to_inches = (int(height_split[0]) * 12) + int(height_split[2])
    dob = datetime.strptime(request_body["dob"], "%a, %d %b %Y %H:%M:%S %Z").date()

    new_profile = User(
        email = chosen_user["email"],
        user_name = chosen_user["user_name"],
        password = chosen_user["password"],
        name = request_body["name"],
        dob = dob,
        picture = request_body["picture"],
        google_id = request_body["google_id"],
        gender = request_body["gender"],
        height_inches = str(height_to_inches),
        weight_pound = request_body["weight_pound"]
        
    )

    db.session.add(new_profile)
    db.session.commit()
    return jsonify(new_profile.response_user()), 201

# get all user profiles
@users_bp.route("", methods=["GET"])
def get_all_profile():
    params = request.args
    # sort users by field
    if "field" in params and "sort" in params:
        if params["sort"].lower() == "desc" or params["sort"].lower() == "descending":
            if params["field"].lower() == "name":
                users = User.query.order_by(desc(User.name)).all()
            elif params["field"].lower() == "id":
                users = User.query.order_by(desc(User.id)).all()
            elif params["field"].lower() == "dob":
                users = User.query.order_by(desc(User.dob)).all()
            elif params["field"].lower() == "gender":
                users = User.query.order_by(desc(User.gender)).all()
        else:
            if params["field"].lower() == "name":
                users = User.query.order_by(asc(User.name)).all()
            elif params["field"].lower() == "dob":
                users = User.query.order_by(asc(User.dob)).all()
            elif params["field"].lower() == "gender":
                users = User.query.order_by(asc(User.gender)).all()
   
    # filter by gender
    elif "gender" in params:
        users = User.query.filter_by(title=params["gender"]).all()

    # no any query params will sort by id
    else:     
        users = User.query.order_by(asc(User.id)).all()

    # return empty list when no task in database
    if len(User.query.all()) == 0:
        return jsonify([]), 200
    # get all tasts
    response_body = [user.response_user_profile() for user in User.query.all()]

    return jsonify(response_body), 200

# get user profile by id
@users_bp.route("/<user_id>", methods=["GET"])
def get_user_profile(user_id):
    chosen_user = get_user_or_abort(user_id)
    return jsonify(chosen_user.response_user_profile()), 200




def get_user_or_abort(user_id):
    user = User.query.get(user_id)
    try:
        user_id = int(user_id)
    except ValueError:
        abort(make_response({"message": f"The user id {user_id} is invalid. The id must be integer."}, 400))
    
    
    if user:
        return user

    abort(make_response({"message": f"The user id {user_id} is not found"}, 404))

