from app import db
class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    log_date = db.Column(db.DateTime, nullable=False)
    meal = db.Column(db.String, nullable=False)
    serving_qty = db.Column(db.Integer, nullable=False)
    item_name = db.Column(db.String, nullable=False)
    brand_name = db.Column(db.String, nullable=False)
    cals = db.Column(db.Integer, nullable=False)
    fat = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    