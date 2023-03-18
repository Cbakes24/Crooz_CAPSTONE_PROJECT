from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Optional

class BookingForm(FlaskForm):
    pickup_date = DateTimeField('Pickup Date', validators=[DataRequired()])
    drop_off_date = DateTimeField('Drop Off Date', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    submit = SubmitField('Book')

# this will send a request to the backend api and then run that vehicle query to get all vehicles based on this info?

#ADD TO MODELSS TO CREAT AVAILABILITY
# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime, timedelta

# class Vehicle(db.Model):
#     __tablename__ = 'vehicles'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     year = db.Column(db.Integer, nullable=True)
#     make = db.Column(db.String(50), nullable=False)
#     model = db.Column(db.String(50), nullable=False)
#     picture = db.Column(db.String, nullable=False)
#     power = db.Column(db.String(50), nullable=False)
#     description = db.Column(db.String(255), nullable=False)
#     type = db.Column(db.String(50), nullable=False)
#     passengers = db.Column(db.Integer, nullable=True)
#     host_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
#         'users.id')), nullable=False)

#     host = db.relationship('User', foreign_keys=[host_id], back_populates='bookings_host')
#     bookings = db.relationship('Booking', back_populates='vehicle')

#     def is_available(self, start_date, end_date):
#         """
#         Check if the vehicle is available for a given date range
#         """
#         for booking in self.bookings:
#             if booking.pickup_date <= end_date and booking.drop_off_date >= start_date:
#                 return False
#         return True

# class Booking(db.Model):
#     __tablename__ = 'bookings'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     pickup_date = db.Column(db.DateTime, nullable=False)
#     drop_off_date = db.Column(db.DateTime, nullable=False)
#     location = db.Column(db.String, nullable=False)
#     guest_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
#         'users.id')), nullable=False)
#     vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
#         'vehicles.id')), nullable=False)

#     guest = db.relationship('User', foreign_keys=[guest_id], back_populates='bookings_guest')
#     vehicle = db.relationship('Vehicle', back_populates='bookings')

#     @staticmethod
#     def make_booking(vehicle, guest, pickup_date, drop_off_date, location):
#         """
#         Create a new booking for the given vehicle, guest and date range
#         """
#         if vehicle.is_available(pickup_date, drop_off_date):
#             booking = Booking(vehicle=vehicle, guest=guest, pickup_date=pickup_date, drop_off_date=drop_off_date, location=location)
#             db.session.add(booking)
#             db.session.commit()
#             return booking
#         else:
#             return None
