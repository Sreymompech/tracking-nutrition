from flask import Blueprint, request, jsonify, abort, make_response
from app.models.record import Record
from app import db