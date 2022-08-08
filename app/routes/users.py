import email
from flask import Blueprint, request, jsonify, abort, make_response
from flask_login import current_user
from app.models.record import Record
from app.models.user import User
from app import db
from datetime import datetime
from sqlalchemy import asc, desc
from app.routes.helper_function import validate_key_post_record, get_record_or_abort, get_user_or_abort, validate_key_login, validate_key_profile, validate_key_update_record
from flask_cors import cross_origin

users_bp = Blueprint("users", __name__, url_prefix="/users")

# create user when they login
@users_bp.route("", methods=["POST"])
@cross_origin()
def create_user_login():
    #exist_user = User.query.get(current_user["login_id"])
    request_user = validate_key_login()
    if "register_at" not in request_user:
        register_at = datetime.now()
    
    chosen_user = False
    users = User.query.all()
    for user in users:
        if request_user["email"] == user.email and request_user["login_id"] == user.login_id:
            chosen_user = True
    if not chosen_user:
        new_user = User(
            email = request_user["email"],
            name = request_user["name"],
            picture = request_user["picture"],
            login_id = request_user["login_id"],
            register_at = register_at
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.response_user_profile()), 201
    abort(make_response({"message": f"The user was existed in database"}, 200))
        #register_at = datetime.strptime(request_user["register_at"], "%b %d %Y %H:%M:%S")
    # users = User.query.all()
    # for user in users:
    #     if request_user["email"] != user.email and request_user["login_id"] != user.login_id:
    #         new_user = User(
    #             email = request_user["email"],
    #             name = request_user["name"],
    #             picture = request_user["picture"],
    #             login_id = request_user["login_id"],
    #             register_at = register_at
    #         )
    #         db.session.add(new_user)
    #         db.session.commit()
    #         return jsonify(new_user.response_user_profile()), 201
    #     abort(make_response({"message": f"The user was existed in database"}, 200))


# create user profile
@users_bp.route("/<user_id>", methods=["PUT", "PATCH"])
@cross_origin()
def create_profile(user_id):
    exist_user = get_user_or_abort(user_id)
    request_user = validate_key_profile()
    height_split = request_user["height"].split()
    height_inches = (int(height_split[0]) * 12) + int(height_split[2])
    dob = datetime.strptime(request_user["dob"], "%m/%d/%Y")

    if exist_user:
        exist_user.dob = dob,
        exist_user.gender = request_user["gender"].capitalize(),
        exist_user.height_inches = height_inches,
        exist_user.weight_pound = request_user["weight"]
    
    db.session.add(exist_user)
    db.session.commit()
    return jsonify(exist_user.response_user_profile()), 200
    

# get all users
@users_bp.route("", methods=["GET"])
@cross_origin()
def get_all_users():
    #users = sort_or_filter_user()

    # return empty list when no task in database
    if len(User.query.all()) == 0:
        return jsonify([]), 200

    params = request.args
    # sort users by field
    if "field" in params and "sort" in params:
        if params["sort"].lower() == "desc" or params["sort"].lower() == "descending":
            if params["field"].lower() == "name":
                users = User.query.order_by(desc(User.name)).all()
            elif params["field"].lower() == "id":
                users = User.query.order_by(desc(User.register_at)).all()
            elif params["field"].lower() == "dob":
                users = User.query.order_by(desc(datetime.today() - User.dob)).all()
            elif params["field"].lower() == "gender":
                users = User.query.order_by(desc(User.gender)).all()
        else:
            if params["field"].lower() == "name":
                users = User.query.order_by(asc(User.name)).all()
            elif params["field"].lower() == "id":
                users = User.query.order_by(asc(User.register_at)).all()
            elif params["field"].lower() == "dob":
                users = User.query.order_by(asc(datetime.today() - User.dob)).all()
            elif params["field"].lower() == "gender":
                users = User.query.order_by(asc(User.gender)).all()

    # filter by gender
    elif "gender" in params:
        users = User.query.filter_by(gender=params["gender"].capitalize()).all()

    # no any query params will sort by register date
    else:     
        users = User.query.order_by(asc(User.register_at)).all()

    # get all tasts
    response_body = [user.response_user_profile() for user in users]

    return jsonify(response_body), 200


# get user profile by id
@users_bp.route("/<user_id>", methods=["GET"])
@cross_origin()
def get_user_by_id(user_id):
    chosen_user = get_user_or_abort(user_id)
    return jsonify(chosen_user.response_user_profile()), 200


# delete user
@users_bp.route("/<user_id>", methods=["DELETE"])
@cross_origin()
def delete_user(user_id):
    chosen_user = get_user_or_abort(user_id)
    db.session.delete(chosen_user)
    db.session.commit()
    return jsonify({"message": f"User id {user_id} was successfully deleted"}), 200


# get all records belong a user
@users_bp.route("/<user_id>/records", methods=["GET"])
@cross_origin()
def get_all_records_by_user(user_id):

    chosen_user = get_user_or_abort(user_id)

    if len(chosen_user.records) == 0:
        return jsonify([]), 200

    # filter record by specific field
    response_body = []
    params = request.args

    for record in chosen_user.records:

        if "log_date" in params and "meal_type" in params:
            if datetime.strftime(record.log_date, "%m/%d/%Y") == params["log_date"] and record.meal_type == params["meal_type"].capitalize():
                response_body.append(record.response_record())

        elif "log_date" in params:
            if datetime.strftime(record.log_date, "%m/%d/%Y") == params["log_date"]:
                response_body.append(record.response_record())

        elif "meal_type" in params:
            if record.meal_type == params["meal_type"].capitalize():
                response_body.append(record.response_record())

        elif "total_cals" in params:
            if record.total_cals == int(params["total_cals"]):
                response_body.append(record.response_record())

        elif "total_fat" in params:
            if record.total_fat == int(params["total_fat"]):
                response_body.append(record.response_record())

        else:
            response_body.append(record.response_record())
        
    # sort response_body by register_at
    return jsonify((sorted(response_body, key=lambda x: x["register_at"]))), 200


# get a record belong user id
@users_bp.route("/<user_id>/records/<record_id>", methods=["GET"])
@cross_origin()
def get_a_record_belong_user(user_id, record_id):
    chosen_record = get_record_or_abort(record_id)
    
    if chosen_record and str(chosen_record.user_id) == user_id:
        return jsonify(chosen_record.response_record()), 200
    abort(make_response({"message": f"The user id {user_id} is not found"}, 404))


# post record by user
@users_bp.route("/<user_id>/records", methods=["POST"])
def create_record_belong_user(user_id):
    chosen_user = get_user_or_abort(user_id)
    request_record = validate_key_post_record()
    if "register_at" not in request_record or "user_id" not in request_record:
        register_at = datetime.now()
        request_record["user_id"] = user_id

    if chosen_user or len(chosen_user.records) == 0:
        new_record = Record(
            log_date = datetime.strptime(request_record["log_date"], "%m/%d/%Y"),
            # meal_type = request_record["meal_type"].capitalize(),
            # serving_qty = request_record["serving_qty"],
            register_at = register_at,
            item_name = request_record["item_name"],
            brand_name = request_record["brand_name"],
            total_cals = request_record["total_cals"],
            total_fat = request_record["total_fat"],
            user_id = request_record["user_id"]
        )
        db.session.add(new_record)
        db.session.commit()
        return jsonify(new_record.response_record()), 201

# @users_bp.route("/<user_id>/records", methods=["POST"])
# def create_record_belong_user(user_id):
#     chosen_user = get_user_or_abort(user_id)
#     request_record = validate_key_post_record()
#     if "register_at" not in request_record or "user_id" not in request_record:
#         register_at = datetime.now()
#         request_record["user_id"] = user_id

#     if chosen_user:
#         new_record = Record(
#             log_date = datetime.strptime(request_record["log_date"], "%m/%d/%Y"),
#             # meal_type = request_record["meal_type"].capitalize(),
#             # serving_qty = request_record["serving_qty"],
#             register_at = register_at,
#             item_name = request_record["item_name"],
#             brand_name = request_record["brand_name"],
#             total_cals = request_record["total_cals"],
#             total_fat = request_record["total_fat"],
#             user_id = request_record["user_id"]
#         )
#         db.session.add(new_record)
#         db.session.commit()
#         return jsonify(new_record.response_record()), 201

# update record belong a user id
@users_bp.route("/<user_id>/records/<record_id>", methods=["PATCH"])
@cross_origin()
def update_record_belong_user(user_id, record_id):
    chosen_record = get_record_or_abort(record_id)
    request_record = validate_key_update_record()
    if chosen_record and str(chosen_record.user_id) == user_id:
        chosen_record.meal_type = request_record["meal_type"].capitalize()
        chosen_record.serving_qty = request_record["serving_qty"]
        chosen_record.total_cals = request_record["total_cals"],
        chosen_record.total_fat = request_record["total_fat"]
        
    db.session.add(chosen_record)
    db.session.commit()
    return jsonify(chosen_record.response_record()), 200


# delete record by user id
@users_bp.route("/<user_id>/records/<record_id>", methods=["DELETE"])
@cross_origin()
def delete_record_belong_user(user_id, record_id):
    chosen_record = get_record_or_abort(record_id)
    
    if chosen_record and str(chosen_record.user_id) == user_id:
        db.session.delete(chosen_record)
        db.session.commit()

    return jsonify({"message": f"Records id '{record_id}' of User id '{user_id}' was successfully deleted"}), 200
