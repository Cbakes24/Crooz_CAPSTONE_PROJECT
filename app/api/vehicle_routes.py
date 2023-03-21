from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Booking, User, Review, Vehicle, favorites
from app.forms.vehicle_form import VehicleForm


vehicle_bp = Blueprint('vehicle', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET ALL VEHICLES
@vehicle_bp.route('', methods=['GET'])
def get_all_vehicles():
    """
    Query for all vehicles and returns them in a list of vehicle dictionaries
    """
    vehicles = Vehicle.query.all()
    return [vehicle.to_dict() for vehicle in vehicles]



# CREATE A VEHICLE
@vehicle_bp.route('', methods=['POST'])
@login_required
def create_vehicle():
    """
    Query for creating a vehicle and returning it as a dictionary
    """
    form = VehicleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_vehicle = Vehicle()
        new_vehicle.host_id = current_user.id
        form.populate_obj(new_vehicle)
        db.session.add(new_vehicle)
        db.session.commit()
        return jsonify(

            new_vehicle.to_dict()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


    # new_vehicle = Vehicle(
    #     year=form.year.data,
    #     make=form.make.data,
    #     model=form.model.data,
    #     type=form.type.data,
    #     power=form.power.data,
    #     passengers=form.passengers.data,
    #     description=form.description.data,
    #     picture=form.picture.data
    # )
