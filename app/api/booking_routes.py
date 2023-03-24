
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Booking, Vehicle, User

booking_bp = Blueprint('booking', __name__)

#GET ALL BOOKINGS FOR A USER - guest
@booking_bp.route('guest', methods=['GET'])
@login_required
def get_guest_bookings():
    """
    Returns a list of all guest bookings for the current user
    """
    user_bookings = Booking.query.filter_by(guest_id=current_user.id).all()
    return jsonify([booking.to_dict() for booking in user_bookings])

#GET ALL BOOKINGS FOR A USER - host
@booking_bp.route('host', methods=['GET'])
@login_required
def get_host_bookings():
    """
    Returns a list of all host bookings for the current user
    """
    user_bookings = Booking.query.join(Vehicle).filter_by(host_id = current_user.id).all()
    return jsonify([booking.to_dict() for booking in user_bookings])

#CREATE A BOOKING
@booking_bp.route('', methods=['POST'])
@login_required
def get_host_bookings():
    """
    Creates a booking with a selected vehicle
    """

# vehicle_location = Vehicle.query.join(User).filter_by(user.city)
