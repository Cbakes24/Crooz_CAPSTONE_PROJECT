from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Booking, User, Review, Vehicle, favorites


favorite_bp = Blueprint('favorite', __name__)



# GET A USER'S FAVORITE Vehicles
@favorite_bp.route('/<int:id>', methods=['GET'])
@login_required
def get_user_favorite_vehicles(id):
    """
    Query for a user's favorite vehicles and returns them in a list of vehicle dictionaries
    """
    user_id = current_user.id
    user = User.query.get(id)
    print(user, "******* USERRRR *****")
    favorite_vehicles = db.session.query(Vehicle).join(favorites).filter(favorites.c.user_id == id).all()
    return jsonify([vehicle.to_dict() for vehicle in favorite_vehicles])


# ADD TO FAVS
@favorite_bp.route('/<int:id>', methods=['POST'])
@login_required
def add_favorite_vehicle(id):
    """
    Query for add to a user's favorite vehicles and returns them in a list of vehicle dictionaries
    """
    vehicle = Vehicle.query.get(id)
    user = User.query.get(current_user.id)
    print(user.fav_vehicles, "USER FAV VEHICLES")
    print(vehicle.id, "ADD THIS VEHICLE")
    print(user.fav_vehicles, "USER FAV VEHICLES")
    for fav_vehicle in user.fav_vehicles:
        if fav_vehicle.id == id:
            return {'errors': ["Vehicle already in user's favorites."]}, 400
    user.fav_vehicles.append(vehicle)
    db.session.commit()
    return  jsonify(vehicle.to_dict_fav())



# REMOVE FROM FAVORITES
@favorite_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_favorite(id):
    """
    Query for a vehicle by id and delete that vehicle
    """
    vehicle = Vehicle.query.get(id)
    if vehicle in current_user.fav_vehicles:
        current_user.fav_vehicles.remove(vehicle)
    db.session.commit()
    print("YOU REMOVED ", vehicle, " FROM YOUR FAVORITES")
    return jsonify({
        'success': True,
        'message': 'Favorite removed from user favorites successfully!',
        'favoriteId': id  
    })
