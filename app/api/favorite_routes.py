from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Booking, User, Review, Vehicle, favorites


favorite_bp = Blueprint('favorite', __name__)


# GET A USER'S FAVORITE CARS
@favorite_bp.route('', methods=['GET'])
@login_required
def get_user_favorite_cars():
    """
    Query for a user's favorite cars and returns them in a list of vehicle dictionaries
    """
    user_id = current_user.id
    favorite_cars = db.session.query(Vehicle).join(favorites).filter(favorites.c.user_id == user_id).all()
    return jsonify([car.to_dict() for car in favorite_cars])

@favorite_bp.route('/<int:id>', methods=['POST'])
@login_required
def add_favorite_car(id):
    """
    Query for add to a user's favorite cars and returns them in a list of vehicle dictionaries
    """
    vehicle = Vehicle.query.get(id)
    user = User.query.get(current_user.id)
    if vehicle in user.favorites:
        return jsonify(message="Vehicle already in user's favorites."), 400
    user.favorites.append(vehicle)
    db.session.commit()
    return  jsonify(vehicle.to_dict_user())
