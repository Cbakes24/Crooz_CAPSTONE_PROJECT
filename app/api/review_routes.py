from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app import db
from app.models import Review, Vehicle
from app.forms import ReviewForm

review_bp = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all reviews
@review_bp.route('', methods=['GET'])
def get_recent_reviews():
    reviews = Review.query.order_by(Review.created_at.desc()).limit(10)
    return jsonify([review.to_dict() for review in reviews]), 200

# Create a review
@review_bp.route('create', methods=['POST'])
def create_review():
    """
    Query for creating a review and returning it as a dictionary
    """

    data= request.json
    # print( " THE DATA", data)
    user_id = data['user_id']
    vehicle_id = data['vehicle_id']
    booking_id = data['booking_id']
    rating = data['rating']
    body = data['body']
    vehicle = Vehicle.query.get(vehicle_id)

    new_review = Review(
        user_id=current_user.id,
        vehicle_id=vehicle_id,
        booking_id=booking_id,
        rating=rating,
        body=body,
        vehicle=vehicle,
    )
    # print(new_review)

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict())


# DELETE REVIEW



# EDIT A REVIEW






    # form = ReviewForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data, "REVIEW FORM DATAA")
    # if form.validate_on_submit():
    #     new_review = Review()
    #     new_review.user_id = current_user.id
    #     form.populate_obj(new_review)
    #     db.session.add(new_review)
    #     db.session.commit()
    #     return jsonify(
    #         new_review.to_dict()
    #     )
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
