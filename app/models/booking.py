from .db import db, environment, SCHEMA, add_prefix_for_prod
# import requests
class Booking(db.Model):
        __tablename__ = 'bookings'

        if environment == "production":
                __table_args__ = {'schema': SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        pickup_date = db.Column(db.DateTime, nullable=False)
        drop_off_date = db.Column(db.DateTime, nullable=False)

        address = db.Column(db.String, nullable=False)
        city = db.Column(db.String, nullable=False)
        state = db.Column(db.String, nullable=False)
        country = db.Column(db.String, nullable=False)
        guest_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
                'users.id')), nullable=False)
        vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
                'vehicles.id')), nullable=False)
        guest = db.relationship('User', back_populates='bookings_guest')
        vehicle = db.relationship('Vehicle', back_populates='bookings')
        review = db.relationship('Review', back_populates='booking')


        def trip_length(self):
                return (self.drop_off_date - self.pickup_date).days

        def to_dict(self):
                return {
                        'id': self.id,
                        'pickupDate': self.pickup_date,
                        'dropOffDate': self.drop_off_date,
                        'address': self.address,
                        'city': self.city,
                        'state': self.state,
                        'country': self.country,
                        'vehicleId': self.vehicle_id,
                        'vehicle': self.vehicle.to_dict_no_booking(),
                        'host': self.vehicle.to_dict_no_booking()['host'],
                        'guest': self.guest.to_dict_user(),
                        'tripLength': self.trip_length(),
                        'totalPrice': self.trip_length() * self.vehicle.to_dict_no_booking()['dailyPrice']

                }
                # the host will come from the vehicle
#   def set_location_coordinates(self):
#                 url = 'https://maps.googleapis.com/maps/api/geocode/json'
#                 params = {
#                     'address': self.address,
#                     'key': 'YOUR_GOOGLE_MAPS_API_KEY'
#                 }
#                 response = requests.get(url, params=params).json()
#                 if response['status'] == 'OK':
#                     self.latitude = response['results'][0]['geometry']['location']['lat']
#                     self.longitude = response['results'][0]['geometry']['location']['lng']


# IN REACT
# <form action="{{ url_for('create_booking') }}" method="POST">
#     <label for="pickup_date">Pickup date:</label>
#     <input type="datetime-local" id="pickup_date" name="pickup_date" required>

#     <label for="drop_off_date">Drop-off date:</label>
#     <input type="datetime-local" id="drop_off_date" name="drop_off_date" required>

#     <label for="address">Address:</label>
#     <input type="text" id="address" name="address" required>

#     <button type="submit">Book</button>
# </form>
