from app import db
from flask_login import UserMixin
from flask import jsonify
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

class User(db.Model, UserMixin):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    register_at = db.Column(db.DateTime, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    user_name = db.Column(db.String)
    password = db.Column(db.String)
    name = db.Column(db.String, nullable=False)
    login_id = db.Column(db.Text, nullable=False)
    picture = db.Column(db.String)
    dob = db.Column(db.Date)
    gender = db.Column(db.String)
    height_inches = db.Column(db.String)
    weight_pound = db.Column(db.Integer)
    cal_goal = db.Column(db.Integer)
    fat_goal = db.Column(db.Integer)
    records = db.relationship("Record", backref="user", lazy=True)

    def response_user_profile(self):
        return {
            "id": self.id,
            "register_at": self.register_at,
            "login_id": self.login_id,
            "email": self.email,
            "name": self.name,
            "dob": self.dob,
            "picture": self.picture,
            "gender": self.gender,
            "height_inches": self.height_inches,
            "weight_pound": self.weight_pound,
            "cal_goal": self.cal_goal,
            "fat_goal": self.fat_goal
        }


