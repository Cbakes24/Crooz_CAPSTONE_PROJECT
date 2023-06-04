from .db import db, environment, SCHEMA, add_prefix_for_prod


favorites = db.Table(
    'favorites',
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False),
    db.Column("vehicle_id", db.Integer, db.ForeignKey(add_prefix_for_prod('vehicles.id'), ondelete='CASCADE'), nullable=False)
    )


if environment == "production":
    favorites.schema = SCHEMA

