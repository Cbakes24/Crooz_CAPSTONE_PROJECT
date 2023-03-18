from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Float, nullable=False)
    body = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    booking_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('bookings.id')), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    vehicle_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('vehicles.id')), nullable=False)



    user = db.relationship('User', back_populates='reviews')
    vehicle = db.relationship('Vehicle', back_populates='review')
    booking = db.relationship('Booking', back_populates='review')
    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'rating': self.rating,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'userId': self.user_id,
            'vehicleId': self.vehicle_id,
            'bookingId': self.booking_id
        }
