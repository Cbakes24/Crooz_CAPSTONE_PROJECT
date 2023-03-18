from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', favVehicles= [1, 2, 3])
    cory = User(
        username='cory', email='cory@gmail.com', password='password', favVehicles= [1])

    heather = User(
        username='heather', email='heather@gmail.com', password='password', favVehicles= [2, 3])

    mac = User(
    username='mac', email='mac@gmail.com', password='password', favVehicles= [5])

    ayla = User(
    username='ayla', email='ayla@gmail.com', password='password', favVehicles= [4, 2])

    leon = User(
    username='leon', email='leon@gmail.com', password='password', favVehicles= [1, 3])

    hailey = User(
    username='hailey', email='hailey@gmail.com', password='password', favVehicles= [1, 2, 3, 4, 5])


    db.session.add(demo)
    db.session.add(cory)
    db.session.add(heather)
    db.session.add(mac)
    db.session.add(ayla)
    db.session.add(leon)
    db.session.add(hailey)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
