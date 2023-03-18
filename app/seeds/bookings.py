from app.models import db, environment, SCHEMA, Booking
from datetime import datetime, timedelta


def seed_bookings():
    booking1 = Booking(pickup_date=today, drop_off_date=tomorrow, location='Miami', guest_id=guest1.id, vehicle_id=vehicle1.id)
    booking2 = Booking(pickup_date=today, drop_off_date=tomorrow, location='New York', guest_id=guest2.id, vehicle_id=vehicle2.id)
    booking3 = Booking(pickup_date=today, drop_off_date=tomorrow, location='San Francisco', guest_id=guest3.id, vehicle_id=vehicle3.id)
# should i use guest_id=1 or guest_id=guest1.id where is the guest seeder made? or is that a user
    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookings")

    db.session.commit()
