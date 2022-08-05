from app import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
class Record(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    register_at = db.Column(db.DateTime)
    log_date = db.Column(db.Date)
    meal_type = db.Column(db.String)
    serving_qty = db.Column(db.Integer)
    item_name = db.Column(db.String)
    brand_name = db.Column(db.String)
    total_cals = db.Column(db.Integer)
    total_fat = db.Column(db.Integer)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id"), nullable=True)
    

    def response_record(self):
        response_body = {
            "id": self.id,
            "register_at": self.register_at,
            "log_date": self.log_date,
            "meal_type": self.meal_type,
            "serving_qty": self.serving_qty,
            "item_name": self.item_name,
            "brand_name": self.brand_name,
            "total_cals": self.total_cals,
            "total_fat": self.total_fat
        }

        if self.user_id:
            response_body["user_id"] = self.user_id

        return response_body