from app.models import db, environment, SCHEMA, Vehicle
from sqlalchemy.sql import text


def seed_users():
    vehicle1 = Vehicle(year=1993, make='Yamaha', model='RX400', picture='picurl', power='gas',
                       description='This baby can cruise to the beach in no time!!!', type='golf cart', host_id=1)

    vehicle2 = Vehicle(
        Vehiclename='marnie', email='marnie@aa.io', password='password')
    vehicle3 = Vehicle(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(vehicle1)
    db.session.add(vehicle2)
    db.session.add(vehicle3)
    db.session.commit()
