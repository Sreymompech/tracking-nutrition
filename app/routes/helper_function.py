from app.models.record import Record
from app.models.user import User
from flask import Blueprint, request, jsonify, abort, make_response
from sqlalchemy import asc, desc


# helper function for record
def get_record_or_abort(record_id):
    chosen_record = Record.query.get(record_id)
    if chosen_record:
        return chosen_record
    abort(make_response({"message": f"The record id {record_id} is not found"}, 404))


def validate_key_post_record():
    request_record = request.get_json()
    if "log_date" in request_record and "item_name" in request_record \
        and "brand_name" in request_record and "total_cals" in request_record \
            and "total_fat" in request_record:
        return request_record
    if "log_date" not in request_record:
        abort(make_response({"message": "Missing log_date"}, 400))
    elif "item_name" not in request_record:
        abort(make_response({"message": "Missing item_namee"}, 400))
    elif "brand_name" not in request_record:
        abort(make_response({"message": "Missing brand_name"}, 400))
    elif "total_cals" not in request_record:
        abort(make_response({"message": "Missing total_cals"}, 400))
    elif "total_fat" not in request_record:
        abort(make_response({"message": "Missing total_fat"}, 400))

def validate_key_update_record():
    request_record = request.get_json()
    if "meal_type" in request_record and "serving_qty" in request_record and "total_cals" in request_record \
            and "total_fat" in request_record:
        return request_record
    if "meal_type" not in request_record:
        abort(make_response({"message": "Missing meal_type"}, 400))
    elif "serving_qty" not in request_record:
        abort(make_response({"message": "Missing serving_qty"}, 400))
    elif "total_cals" not in request_record:
        abort(make_response({"message": "Missing total_cals"}, 400))
    elif "total_fat" not in request_record:
        abort(make_response({"message": "Missing total_fat"}, 400))

    

def sort_or_filter_records():
    # return empty list when user has no record in database
    if len(Record.query.all()) == 0:
        return jsonify([]), 200

    params = request.args
    # sort users by field
    if "field" in params and "sort" in params:
        if params["sort"].lower() == "desc" or params["sort"].lower() == "descending":
            if params["field"].lower() == "log_date":
                records = Record.query.order_by(desc(Record.log_date)).all()
            elif params["field"].lower() == "id":
                records = Record.query.order_by(desc(Record.register_at)).all()
            elif params["field"].lower() == "meal_type":
                records = Record.query.order_by(desc(Record.meal_type)).all()
            elif params["field"].lower() == "total_cals":
                records = Record.query.order_by(desc(Record.total_cals)).all()
            elif params["field"].lower() == "total_fat":
                records = Record.query.order_by(desc(Record.total_fat)).all()
        else:
            if params["field"].lower() == "log_date":
                records = Record.query.order_by(asc(Record.log_date)).all()
            elif params["field"].lower() == "id":
                records = Record.query.order_by(asc(Record.register_at)).all()
            elif params["field"].lower() == "meal_type":
                records = Record.query.order_by(asc(Record.meal_type)).all()
            elif params["field"].lower() == "total_cals":
                records = Record.query.order_by(asc(Record.total_cals)).all()
            elif params["field"].lower() == "total_fat":
                records = Record.query.order_by(asc(Record.total_fat)).all()
   
    # filter by gender
    elif "log_date" in params:
        records = Record.query.filter_by(log_date=params["log_date"]).all()
    
    # filter by meal_type
    elif "meal_type" in params:
        records = Record.query.filter_by(meal_type=params["meal_type"]).all()
    # filter by cals
    elif "total_cals" in params:
        records = Record.query.filter_by(total_cals=params["total_cals"]).all()
    # filter by fat
    elif "total_fat" in params:
        records = Record.query.filter_by(total_fat=params["total_fat"]).all()

    # no any query params will sort by register date
    else:     
        records = Record.query.order_by(asc(Record.register_at)).all()
    return records


    # *****************************************************************************************
# helper function for users
# def get_user_or_abort(login_id):
#     if current_user:
#         exist_user = User.query.filter_by(login_id=current_user.login_id).first()
#         return exist_user
#     flash ("User not login!")
#     abort(make_response({"message": f"The user id {login_id} is not found"}, 404))

def get_user_or_abort(user_id):
    chosen_user = User.query.get(user_id)
    if chosen_user:
        return chosen_user
    abort(make_response({"message": f"The user id {user_id} is not found"}, 404))

# def get_user_by_oauth_or_abort(login_id):
#     chosen_user = User.query.filter_by(login_id=login_id)
#     exist_user = User.query.filter_by(id=chosen_user["id"])
#     if exist_user:
#         return exist_user
#     abort(make_response({"message": f"The user oauth id {login_id} is not found"}, 404))

def validate_key_login():
    request_user = request.get_json()
    if "email" in request_user and "name" in request_user and "login_id" in request_user and "picture" in request_user:
        return request_user
    if "email" not in request_user:
        abort(make_response({"message": "Email is invalid"}, 400))
    elif "name" not in request_user:
        abort(make_response({"message": "name is invalid"}, 400))
    elif "login_id" not in request_user:
        abort(make_response({"message": "Login_id is invalid"}, 400))
    elif "picture" not in request_user:
        abort(make_response({"message": "picture is invalid"}, 400))
    

def validate_key_profile():
    request_user = request.get_json()
    if "dob" in request_user and "gender" in request_user and "height" and request_user and "weight" in request_user:
        return request_user
    if "dob" not in request_user:
        abort(make_response({"message": "dob is invalid"}, 400))
    elif "gender" not in request_user:
        abort(make_response({"message": "gender is invalid"}, 400))
    elif "height" not in request_user:
        abort(make_response({"message": "height is invalid"}, 400))
    elif "weight" not in request_user:
        abort(make_response({"message": "weight is invalid"}, 400))
    

# def sort_or_filter_user():
#     # return empty list when no task in database
#     if len(User.query.all()) == 0:
#         return jsonify([]), 200

#     params = request.args
#     # sort users by field
#     if "field" in params and "sort" in params:
#         if params["sort"].lower() == "desc" or params["sort"].lower() == "descending":
#             if params["field"].lower() == "name":
#                 users = User.query.order_by(desc(User.name)).all()
#             elif params["field"].lower() == "id":
#                 users = User.query.order_by(desc(User.register_at)).all()
#             elif params["field"].lower() == "dob":
#                 users = User.query.order_by(desc(User.dob)).all()
#             elif params["field"].lower() == "gender":
#                 users = User.query.order_by(desc(User.gender)).all()
#         else:
#             if params["field"].lower() == "name":
#                 users = User.query.order_by(asc(User.name)).all()
#             elif params["field"].lower() == "id":
#                 users = User.query.order_by(asc(User.register_at)).all()
#             elif params["field"].lower() == "dob":
#                 users = User.query.order_by(asc(User.dob)).all()
#             elif params["field"].lower() == "gender":
#                 users = User.query.order_by(asc(User.gender)).all()

#     # filter by gender
#     elif "gender" in params:
#         users = User.query.filter_by(gender=params["gender"]).all()

#     # no any query params will sort by register date
#     else:     
#         users = User.query.order_by(asc(User.register_at)).all()
#     return users

def sort_or_filder_record_user_id(user_id):
    
    # return empty list when user has no record in database
    if len(Record.query.filter_by(user_id=user_id).all()) == 0:
        return jsonify([]), 200

    params = request.args
    # sort users by field
    if "field" in params and "sort" in params:
        if params["sort"].lower() == "desc" or params["sort"].lower() == "descending":
            if params["field"].lower() == "log_date":
                records = Record.query.filter_by(user_id=user_id).order_by(desc(Record.log_date)).all()
            elif params["field"].lower() == "id":
                records = Record.query.filter_by(user_id=user_id).order_by(desc(Record.register_at)).all()
            elif params["field"].lower() == "meal_type":
                records = Record.query.filter_by(user_id=user_id).order_by(desc(Record.meal_type)).all()
            elif params["field"].lower() == "total_cals":
                records = Record.query.filter_by(user_id=user_id).order_by(desc(Record.total_cals)).all()
            elif params["field"].lower() == "total_fat":
                records = Record.query.filter_by(user_id=user_id).order_by(desc(Record.total_fat)).all()
        else:
            if params["field"].lower() == "log_date":
                records = Record.query.filter_by(user_id=user_id).order_by(asc(Record.log_date)).all()
            elif params["field"].lower() == "id":
                records = Record.query.filter_by(user_id=user_id).order_by(asc(Record.register_at)).all()
            elif params["field"].lower() == "meal_type":
                records = Record.query.filter_by(user_id=user_id).order_by(asc(Record.meal_type)).all()
            elif params["field"].lower() == "total_cals":
                records = Record.query.filter_by(user_id=user_id).order_by(asc(Record.total_cals)).all()
            elif params["field"].lower() == "total_fat":
                records = Record.query.filter_by(user_id=user_id).order_by(asc(Record.total_fat)).all()
   
    # filter by gender
    elif "log_date" in params:
        records = Record.query.filter(user_id=user_id, log_date=params["log_date"]).all()
    
    # filter by meal_type
    elif "meal_type" in params:
        records = Record.query.filter(user_id=user_id, meal_type=params["meal_type"].lower()).all()
    # filter by cals
    elif "total_cals" in params:
        records = Record.query.filter(user_id=user_id, total_cals=params["total_cals"]).all()
    # filter by fat
    elif "total_fat" in params:
        records = Record.query.filter(user_id=user_id, total_fat=params["total_fat"]).all()

    # no any query params will sort by register date
    else:     
        records = Record.query.filter_by(user_id=user_id).order_by(asc(Record.register_at)).all()
    return records
