from app.models import db, environment, SCHEMA, Vehicle
from sqlalchemy.sql import text


def seed_users():
    vehicle1 = Vehicle(year=2020, make='Yamaha', model='RX400', picture='picurl', power='gas',
                       description='This baby can cruise to the beach in no time!!!', type='golf cart', passengers=2, host_id=1)

    vehicle2 = Vehicle(year=1993, make='Callaway', model='Green Cruiser', picture='picurl', power='electric',
                       description='TThis cart can fit a lot of people!!!', type='golf cart',  passengers=6, host_id=2)

    vehicle3 = Vehicle(year=2007, make='Ping', model='Wheely', picture='picurl', power='gas',
                       description='This is straight up classy', type='golf cart', passengers=6, host_id=3)


    db.session.add(vehicle1)
    db.session.add(vehicle2)
    db.session.add(vehicle3)
    db.session.commit()


def undo_vehicles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.vehicles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM vehicles")

    db.session.commit()
