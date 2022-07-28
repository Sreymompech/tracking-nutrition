from flask import Blueprint, request, jsonify, abort, make_response
import os
from dotenv import load_dotenv
import requests

load_dotenv()

proxy_bp = Blueprint("proxy_bp", __name__, url_prefix="/")

# call Nutritionix - Nutrition Database from rapidapi
@proxy_bp.route("<food_query>", methods=["GET"])
def get_foods_detail(food_query):
    
    if food_query == " ":
        abort(make_response({"message": "You must provide food query"}, 400))
    URL = f"https://nutritionix-api.p.rapidapi.com/v1_1/search/{food_query}"
    HEADER = {
        "X-RapidAPI-Key": os.environ.get("X-RapidAPI-Key"),
        "X-RapidAPI-Host": os.environ.get("X-RapidAPI-Host")

    }

    querystring = {"fields":"item_name,item_id,brand_name,nf_calories,nf_total_fat"}

    
    response = requests.get(URL, params=querystring, headers=HEADER)
    return jsonify(response.json())

# call Nutritionix - Nutrition Database api
# @proxy_bp.route("foods", methods=["GET"])
# def get_foods_detail():
#     food_query = request.args.get("query")
#     if not food_query:
#         abort(make_response({"message": "Must provide query parameter (food)"}, 400))
#     URL = "https://trackapi.nutritionix.com/v2/search/instant"
    
#     HEADER = {
#         "x-app-id": os.environ.get("NUTRITIONIX_APP_ID"),
#         "x-app-key": os.environ.get("NUTRITIONIX_APP_KEY")

#     }
#     param = {
#         "query": food_query,

#     }

#     #querystring = {"fields":"item_name,item_id,brand_name,nf_calories,nf_total_fat"}

    
#     response = requests.get(URL, params=param, headers=HEADER)
#     return jsonify(response.json())



