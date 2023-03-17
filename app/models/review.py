from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    _tablename_ = 'reviews'

if environment == "production":
        __table_args__ = {'schema': SCHEMA}

id
