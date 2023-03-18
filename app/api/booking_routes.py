
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Booking

booking_bp = Blueprint('booking', __name__)


#GET ALL BOOKINGS FOR A USER
@booking_bp.route('/bookings', methods=['GET'])
@login_required
def get_user_bookings():
    """
    Returns a list of all bookings for the current user
    """
    user_bookings = Booking.query.filter_by(guest_id=current_user.id).all()
    return jsonify([booking.to_dict() for booking in user_bookings])


