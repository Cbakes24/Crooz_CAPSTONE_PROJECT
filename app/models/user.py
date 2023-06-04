from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .favorites import favorites

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    bookings_guest = db.relationship('Booking', back_populates='guest')
    bookings_host = db.relationship('Vehicle', back_populates='host')
    fav_vehicles = db.relationship("Vehicle", secondary=favorites, back_populates="fav_by_users", cascade='all, delete')
    reviews = db.relationship('Review', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_full_address(self):
        return f"{self.address}, {self.city}, {self.state}, {self.country}"

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'address': self.get_full_address(),
            'city': self.city,
            'state' : self.state,
            'country': self.country,
            'favVehicles': [vehicle.id for vehicle in self.fav_vehicles]
        }

# able to see the user without seeing their favorite cars, also avoids recursion
    def to_dict_user(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'address': self.get_full_address(),
            'city': self.city,
            'state' : self.state,
            'country': self.country,
        }
