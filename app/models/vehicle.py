from .db import db, environment, SCHEMA, add_prefix_for_prod
from .favorites import favorites
class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=True)
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    picture = db.Column(db.String, nullable=False)
    power = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    type= db.Column(db.String(50), nullable=False)
    passengers = db.Column(db.Integer, nullable=True)
    daily_price = db.Column(db.Integer, nullable=True)
    host_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
            'users.id')), nullable=False)

    reviews = db.relationship('Review', back_populates='vehicle', cascade='all, delete', passive_deletes=True)
    host = db.relationship('User', back_populates='bookings_host')
    bookings = db.relationship('Booking', back_populates='vehicle', cascade='all, delete-orphan', passive_deletes=True)
    fav_by_users = db.relationship("User", secondary=favorites, back_populates="fav_vehicles", cascade='all, delete' )


    def to_dict(self):
        return {
            'id': self.id,
            'year': self.year,
            'make': self.make,
            'model': self.model,
            'picture': self.picture,
            'power': self.power,
            'description': self.description,
            'type': self.type,
            'passengers': self.passengers,
            'host': self.host.to_dict_user(),
            'city': self.host.to_dict_user()['city'],
            'address': self.host.to_dict_user()['address'],
            'dailyPrice': self.daily_price,
            'reviews' : [review.to_dict() for review in self.reviews],
            'bookings': [booking.to_dict() for booking in self.bookings]
        }


# able to view the vehicle without seeing all the vehicles bookings, also avoids recursion
    def to_dict_no_booking(self):
        return {
            'id': self.id,
            'year': self.year,
            'make': self.make,
            'model': self.model,
            'picture': self.picture,
            'power': self.power,
            'description': self.description,
            'type': self.type,
            'passengers': self.passengers,
            'dailyPrice': self.daily_price,
            'city': self.host.to_dict_user()['city'],
            'reviews' : [review.to_dict() for review in self.reviews],
            'host': self.host.to_dict_user(),
        }

    def to_dict_fav(self):
            return {
                'id': self.id,
                'year': self.year,
                'make': self.make,
                'model': self.model,
                'picture': self.picture,
                'power': self.power,
                'description': self.description,
                'type': self.type,
                'passengers': self.passengers,
                'dailyPrice': self.daily_price,
                'city': self.host.to_dict_user()['city'],

            }
    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'year': self.year,
    #         'make': self.make,
    #         'model': self.model,
    #         'picture': self.picture,
    #         'power': self.power,
    #         'description': self.description,
    #         'type': self.type,
    #         'passengers': self.passengers,
    #         'hostId': self.host_id,
    #     }
