from app.models import db, environment, SCHEMA, Booking
from datetime import datetime, timedelta


def seed_bookings():
    booking1 = Booking(pickup_date=datetime(2023,5,16,8,0,0), drop_off_date=datetime(2023,5,20,8,0,0), address='123 Cool Lane', city='San Diego', state='CA', country='USA', guest_id=5, vehicle_id=1)
    booking2 = Booking(pickup_date=datetime(2023,6,20,8,0,0), drop_off_date=datetime(2023,6,27,8,0,0), address='300 Happy st', city='Boston', state='MA', country='USA', guest_id=6, vehicle_id=2)
    booking3 = Booking(pickup_date=datetime(2023,7,20,8,0,0), drop_off_date=datetime(2023,7,27,8,0,0), address='13 Haines st', city='San Diego', state='CA', country='USA', guest_id=5, vehicle_id=3)
    booking4 = Booking(pickup_date=datetime(2023,8,20,8,0,0), drop_off_date=datetime(2023,8,27,8,0,0), address='127 Phillips Brooks Rd', city='Boston', state='MA', country='USA', guest_id=1, vehicle_id=4)
    booking5 = Booking(pickup_date=datetime(2023,9,20,8,0,0), drop_off_date=datetime(2023,9,27,8,0,0), address='1 Westwood Ave St', city='Boston', state='MA', country='USA', guest_id=2, vehicle_id=5)
    booking6 = Booking(pickup_date=datetime(2023,10,20,8,0,0), drop_off_date=datetime(2023,10,27,8,0,0), address='1 Westwood Ave Ave', city='Boston', state='MA', country='USA', guest_id=1, vehicle_id=4)
    booking7 = Booking(pickup_date=datetime(2023,2,16,8,0,0), drop_off_date=datetime(2023,2,20,8,0,0), address='123 Cool Lane', city='San Diego', state='CA', country='USA', guest_id=5, vehicle_id=1)
    booking8 = Booking(pickup_date=datetime(2023,3,20,8,0,0), drop_off_date=datetime(2023,3,27,8,0,0), address='300 Happy st', city='Boston', state='MA', country='USA', guest_id=4, vehicle_id=2)
    booking9 = Booking(pickup_date=datetime(2023,1,20,8,0,0), drop_off_date=datetime(2023,1,27,8,0,0), address='1 Westwood Ave St', city='Boston', state='MA', country='USA', guest_id=2, vehicle_id=5)
    booking10 = Booking(pickup_date=datetime(2023,1,20,8,0,0), drop_off_date=datetime(2023,1,27,8,0,0), address='123 Cool Lane', city='San Diego', state='CA', country='USA', guest_id=4, vehicle_id=1)
    booking11 = Booking(pickup_date=datetime(2023,11,20,8,0,0), drop_off_date=datetime(2023,11,27,8,0,0), address='123 Cool Lane', city='San Diego', state='CA', country='USA', guest_id=4, vehicle_id=1)
# should i use guest_id=1 or guest_id=guest1.id where is the guest seeder made? or is that a user
    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)
    db.session.add(booking5)
    db.session.add(booking6)
    db.session.add(booking7)
    db.session.add(booking8)
    db.session.add(booking9)
    db.session.add(booking10)
    db.session.add(booking11)
    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookings")

    db.session.commit()
