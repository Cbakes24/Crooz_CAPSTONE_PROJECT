from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Booking, User, Review, Vehicle, favorites


favorite_bp = Blueprint('favorite', __name__)


# GET A USER'S FAVORITE Vehicles
@favorite_bp.route('', methods=['GET'])
@login_required
def get_user_favorite_vehicles():
    """
    Query for a user's favorite vehicles and returns them in a list of vehicle dictionaries
    """
    user_id = current_user.id
    favorite_vehicles = db.session.query(Vehicle).join(favorites).filter(favorites.c.user_id == user_id).all()
    return jsonify([vehicle.to_dict() for vehicle in favorite_vehicles])

@favorite_bp.route('/<int:id>', methods=['POST'])
@login_required
def add_favorite_vehicle(id):
    """
    Query for add to a user's favorite vehicles and returns them in a list of vehicle dictionaries
    """
    vehicle = Vehicle.query.get(id)
    user = User.query.get(current_user.id)
    print(user.fav_vehicles, "USERRRRRRRRR")
    if vehicle in user.fav_vehicles:
        return jsonify(message="Vehicle already in user's favorites."), 400
    user.fav_vehicles.append(vehicle)
    db.session.commit()
    return  jsonify(vehicle.to_dict_fav())
