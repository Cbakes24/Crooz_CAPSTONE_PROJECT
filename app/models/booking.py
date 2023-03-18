from .db import db, environment, SCHEMA, add_prefix_for_prod

class Booking(db.Model):
        __tablename__ = 'bookings'

        if environment == "production":
                __table_args__ = {'schema': SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        pickup_date = db.Column(db.DateTime, nullable=False)
        drop_off_date = db.Column(db.DateTime, nullable=False)
        location = db.Column(db.String, nullable=False)
        guest_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
                'users.id')), nullable=False)
        vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
                'vehicles.id')), nullable=False)
        review_id = db.Column(db.Integer, db.ForeignKey(
                add_prefix_for_prod('reviews.id')), nullable=False)


        guest = db.relationship('User', foreign_keys=[guest_id], back_populates='bookings_guest')
        vehicle = db.relationship('Vehicle', back_populates='bookings')
        review = db.relationship('Review', back_populates='booking')




        def to_dict(self):
                return {
                        'id': self.id,
                        'pickupDate': self.pickup_date,
                        'dropOffDate': self.drop_off_date,
                        'location': self.location,
                        'vehicle': self.vehicle.to_dict(),
                        'guest': self.guest,
                }
                # the host will come from the vehicle
