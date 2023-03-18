from app.models import db, environment, SCHEMA, Vehicle
from sqlalchemy.sql import text


def seed_users():
    vehicle1 = Vehicle(year=2020, make='Yamaha', model='Concierge-6', power='gas',
                       description='This baby can fit 6 people comfortably to go anywhere you want! It also whips at 19mph woooo',
                       type='golf cart', passengers=6, host_id=1, picture='https://www.yamahagolfcar.com/Images/navigation/thumbnails/nav-concierge-6.png')

    vehicle2 = Vehicle(year=2023, make='ClubCar', model='Tempo Li-Ion', power='electric',
                       description='Whats more, when its time to power up, the fast charging times and ability to hold a charge across multiple rounds keep our Lithium Ion-powered golf carts on the course and out of the barn.',
                       type='golf cart',  passengers=2, host_id=2, picture='https://www.clubcar.com/-/media/project/milky-way/clubcar/clubcar-images/tempo/tempo-lithium-ion/tempo-lithium-header-photo-1280x720.jpg')

    vehicle3 = Vehicle(year=2023, make='Ride1Up', model='Cafe Cruiser', power='electric',
                       description='The bike Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural',
                       type='e-bike', passengers=6, host_id=3, picture='https://media.wired.com/photos/63e569c9de59d567d5d7c66d/master/w_2240%2Cc_limit/Ride1Up-Cafe-Cruiser-Featured-Gear.jpg')

    vehicle4 = Vehicle(year=2023, make='VanMook', model='Cowboy4 St', power='electric',
                       description='This is straight up classy as far as bikes go',
                       type='e-bike', passengers=1, host_id=4, picture='https://media.wired.com/photos/62b5f84c600b0ec42e8fdf2a/master/w_2240%2Cc_limit/Cowboy-4-ST-Gear.jpg')

    vehicle5 = Vehicle(year=2023, make='LeMond', model='Prolog', power='electric',
                       description='has an insanely light frame, a stunning matte paint job, and fancy-schmancy custom-designed fenders. It also has reliable components made by well-known manufacturers—a one-button Mahle drive system',
                       type='e-bike', passengers=1, host_id=4, picture='https://media.wired.com/photos/62b5f84c600b0ec42e8fdf2a/master/w_2240%2Cc_limit/Cowboy-4-ST-Gear.jpg')
# or should it be host = user1 or johnny

    db.session.add(vehicle1)
    db.session.add(vehicle2)
    db.session.add(vehicle3)
    db.session.add(vehicle4)
    db.session.add(vehicle5)
    db.session.commit()


def undo_vehicles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.vehicles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM vehicles")

    db.session.commit()
