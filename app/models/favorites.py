from .db import db, environment, SCHEMA, add_prefix_for_prod


favorites = db.Table(
    'favorites',
    # db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False),
    db.Column("vehicle_id", db.Integer, db.ForeignKey(add_prefix_for_prod('vehicles.id')), nullable=False)
    )


if environment == "production":
    favorites.schema = SCHEMA





# class Favorite(db.Model):
#     _tablename_ = 'favorites'

# if environment == "production":
#         __table_args__ = {'schema': SCHEMA}


# id = db.Column(db.Integer, primary_key=True)
# user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
# vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('vehicles.id')), nullable=False)

# guest = db.relationship('User', back_populates='favorites')
# vehicle = db.relationship('Vehicle', back_populates='favorites')
