
from datetime import datetime
from flask import Blueprint, request, jsonify, abort, make_response
from app.models.record import Record
from app import db
from sqlalchemy import asc, desc
from app.routes.helper_function import sort_or_filter_records, get_record_or_abort, validate_key_post_record

records_bp = Blueprint("records", __name__, url_prefix="/records")

# get all records
@records_bp.route("", methods=["GET"])
def get_all_records():

    #records = sort_or_filter_records()
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
        records = Record.query.filter_by(meal_type=params["meal_type"].capitalize()).all()
    # filter by cals
    elif "total_cals" in params:
        records = Record.query.filter_by(total_cals=params["total_cals"]).all()
    # filter by fat
    elif "total_fat" in params:
        records = Record.query.filter_by(total_fat=params["total_fat"]).all()

    # no any query params will sort by register date
    else:     
        records = Record.query.order_by(asc(Record.register_at)).all()

    # get all tasts
    response_body = [record.response_record() for record in records]

    return jsonify(response_body), 200

# get record by id
@records_bp.route("/<record_id>", methods=["GET"])
def get_record_by_id(record_id):
    exist_record = get_record_or_abort(record_id)
    return jsonify(exist_record.response_record()), 200

# delete record by id
@records_bp.route("/<record_id>", methods=["DELETE"])
def delete_record(record_id):
    chosen_record = get_record_or_abort(record_id)
    db.session.delete(chosen_record)
    db.session.commit()
    return jsonify({"message": f"Record id {record_id} was successfully deleted"}), 200

# create new record
@records_bp.route("", methods=["POST"])
def post_record():
    request_record = validate_key_post_record()
    if "register_at" not in request_record:
        request_record["register_at"] = datetime.now()
        #datetime.strptime(request_record["register_at"], "%b %d %Y %H:%M:%S")

    new_record = Record(
        log_date = datetime.strptime(request_record["log_date"], "%m/%d/%Y"),
        meal_type = request_record["meal_type"].capitalize(),
        serving_qty = request_record["serving_qty"],
        register_at = request_record["register_at"],
        item_name = request_record["item_name"],
        brand_name = request_record["brand_name"],
        total_cals = request_record["total_cals"],
        total_fat = request_record["total_fat"]
    )

    db.session.add(new_record)
    db.session.commit()
    return jsonify(new_record.response_record()), 201


# update new record
@records_bp.route("/<record_id>", methods=["PUT", "PATCH"])
def update_record(record_id):
    chosen_record = get_record_or_abort(record_id)
    request_record = validate_key_post_record()

    if chosen_record:
        chosen_record.log_date = datetime.strptime(request_record["log_date"], "%m/%d/%Y")
        chosen_record.meal_type = request_record["meal_type"].capitalize(),
        chosen_record.serving_qty = request_record["serving_qty"],
        chosen_record.item_name = request_record["item_name"],
        chosen_record.brand_name = request_record["brand_name"],
        chosen_record.total_cals = request_record["total_cals"],
        chosen_record.total_fat = request_record["total_fat"]

        db.session.add(chosen_record)
        db.session.commit()
    return jsonify(chosen_record.response_record()), 200




