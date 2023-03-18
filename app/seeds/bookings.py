from app.models import db, environment, SCHEMA, Booking
from datetime import datetime, timedelta


def seed_bookings():
    booking1 = Booking(pickup_date=5/16/2023, drop_off_date=5/20/2023, location='Miami', guest_id=5, vehicle_id=1)
    booking2 = Booking(pickup_date=4/3/2023, drop_off_date=4/12/2023, location='New York', guest_id=6, vehicle_id=2)
    booking3 = Booking(pickup_date=6/1/2023, drop_off_date=6/7/2023, location='San Francisco', guest_id=7, vehicle_id=3)
    booking4 = Booking(pickup_date=5/16/2023, drop_off_date=5/20/2023, location='Miami', guest_id=1, vehicle_id=4)
    booking5 = Booking(pickup_date=4/3/2023, drop_off_date=4/12/2023, location='New York', guest_id=2, vehicle_id=5)

# should i use guest_id=1 or guest_id=guest1.id where is the guest seeder made? or is that a user
    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)
    db.session.add(booking5)
    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookings")

    db.session.commit()
