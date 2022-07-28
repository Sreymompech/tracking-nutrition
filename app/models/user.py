from app import db
from flask_login import UserMixin
from flask import jsonify, abort, make_response

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True)
    user_name = db.Column(db.String)
    password = db.Column(db.String)
    name = db.Column(db.String)
    google_id = db.Column(db.String)
    picture = db.Column(db.String)
    dob = db.Column(db.DateTime)
    gender = db.Column(db.String)
    height_inches = db.Column(db.String)
    weight_pound = db.Column(db.Integer)
    records = db.relationship("Record", backref="user", lazy=True)

    def response_user_profile(self):
        return {
            "id": self.id,
            "google_id": self.google_id,
            "email": self.email,
            "name": self.name,
            "dob": self.name,
            "picture": self.picture,
            "gender": self.gender,
            "height_inches": self.height_inches,
            "weight_pound": self.weight_pound
        }

    @staticmethod
    def post_user_oauth(user):
        chosen_user = User.query.get(user["google_id"])
        if not chosen_user:
            new_user = User(
                email=user["email"],
                name=user["name"],
                google_id=user["google_id"],
                picture=user["profile_pic"],
                user_name=None,
                password=None,
                dob=None,
                gender=None,
                height_inches=None,
                weight_pound=None
            )
            db.session.add(new_user)
            db.session.commit()
        return jsonify(new_user), 201

    @staticmethod
    def get_user_oauth(google_id):
        chosen_user = User.query.get(google_id)
        if not chosen_user:
            return None
        return jsonify(chosen_user), 200


