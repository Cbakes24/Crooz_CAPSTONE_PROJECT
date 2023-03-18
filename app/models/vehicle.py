from .db import db, environment, SCHEMA, add_prefix_for_prod
from.favorites import favorites
class Vehicle(db.Model):
    _tablename_ = 'vehicles'

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
# availability =  ??????????
host_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'users.id')), nullable=False)

host = db.relationship('User', foreign_keys=[host_id], back_populates='bookings_host')
bookings = db.relationship('Booking', back_populates='vehicle')
fav_by_users = db.relationship("User", secondary=favorites, back_populates="fav_vehicles" )

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
        'host': self.host,
        'bookings': self.bookings.to_dict()
    }
