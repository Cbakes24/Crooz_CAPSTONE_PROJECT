from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
demo = User(
   first_name='Demo', last_name='Demovski', username='Demo', email='demo@aa.io', password='password', address='123 Happy St', city='San Diego', state='CA', country='USA')

cory = User(
    first_name='Cory', last_name='Baker', username='cory', email='cory@gmail.com', password='password', address='127 Phillips Brooks rd', city='Boston', state='MA', country='USA',)

heather = User(
    first_name='Heather', last_name='Baker', username='heather', email='heather@gmail.com', password='password', address='1509 Chalcedony st', city='San Diego', state='CA', country='USA',)

mac = User(
    first_name='Mac', last_name='Baker',   username='mac', email='mac@gmail.com', password='password', address='5 Deacons Folly rd', city='Boston', state='MA', country='USA',)

ayla = User(
    first_name='Ayla', last_name='Rey', username='ayla', email='ayla@gmail.com', password='password', address='1227 Chalcedony st', city='San Diego', state='CA', country='USA',)

leon = User(
    first_name='Leon', last_name='Ross', username='leon', email='leon@gmail.com', password='password', address='1852 Reed Ave', city='San Diego', state='CA', country='USA',)

hailey = User(
    first_name='Hailey', last_name='Claire', username='hailey', email='hailey@gmail.com', password='password', address='6030 North 2nd St', city='Phoenix', state='AZ', country='USA',)

def seed_users():


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
