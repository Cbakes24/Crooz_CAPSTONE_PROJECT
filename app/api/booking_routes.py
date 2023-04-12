from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Booking, User, Review, Vehicle, favorites
from app.forms.vehicle_form import VehicleForm
import datetime

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


# CREATE A BOOKING
@booking_bp.route('create', methods=['POST'])
@login_required
def create_bookings():
    """
    Creates a booking with a selected vehicle
    """
    data = request.json
    print( " THE DATA", data)
    address = data['address']
    city = data['city']
    state = data['state']
    country = data['country']
    pickup_date = data['pickupDate']
    drop_off_date = data['dropOffDate']
    vehicle_id = data['vehicleId']
    vehicle = Vehicle.query.get(vehicle_id)


    new_booking = Booking(
        guest_id=current_user.id,
        address=address,
        city=city,
        state=state,
        country=country,
        pickup_date=datetime.datetime.fromisoformat(pickup_date),
        drop_off_date=datetime.datetime.fromisoformat(drop_off_date),
        vehicle=vehicle,
        vehicle_id=vehicle_id

    )
    print(new_booking.pickup_date, "PICKUP DATEEE")

    db.session.add(new_booking)
    db.session.commit()

    return jsonify(new_booking.to_dict())


# GET ALL VEHICLES FROM LOCATION
@booking_bp.route('/search', methods=['POST'])
@login_required
def vehicles_by_location():
    data = request.json
    print( " THE DATA", data)
    address = data['address']
    city = data['city']
    print('cityyyyyy yaaa', city)
    state = data['state']
    country = data['country']
    pickup_date = data['pickupDate']
    drop_off_date = data['dropOffDate']



    filtered_vehicles = (db.session.query(Vehicle).join(Vehicle.host).filter(User.city == city).all())
    print("FILTERED VEHICLES!!!", filtered_vehicles)
    return {'vehicles': [vehicle.to_dict() for vehicle in filtered_vehicles]}

# DELETE A BOOKING
@booking_bp.route('/<int:id>', methods=['DELETE'])
def delete_booking_by_id(id):
    """
    Query for a booking by id and delete that booking
    """
    booking = Booking.query.get(id)
    print(booking, "BOOKING TO DELEETTTEEEE")
    db.session.delete(booking)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Booking deleted successfully!'
    })


# vehicle_location = Vehicle.query.join(User).filter_by(user.city)
