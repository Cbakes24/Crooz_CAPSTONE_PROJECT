from app.models import db, environment, SCHEMA, Vehicle
from sqlalchemy.sql import text
from .users import demo, cory, heather, mac, ayla, leon, hailey


def seed_vehicles():
    vehicle1 = Vehicle(year=2020, make='Garia', model='Concierge-6', power='electric', daily_price=120,
                       description='This baby can fit 6 people comfortably to go anywhere you want! It also whips at 19mph woooo',
                       type='golf cart', passengers=6, host_id=1, picture='https://www.garia.com/assets/Slideshow/models-supersport-slide-13.jpg')

    vehicle2 = Vehicle(year=2023, make='ClubCar', model='Tempo Li-Ion', power='electric', daily_price=24,
                       description='Whats more, when its time to power up, the fast charging times and ability to hold a charge across multiple rounds keep our Lithium Ion-powered golf carts on the course and out of the barn.',
                       type='golf cart',  passengers=2, host_id=2, picture='https://www.clubcar.com/-/media/project/milky-way/clubcar/clubcar-images/tempo/tempo-lithium-ion/tempo-lithium-header-photo-1280x720.jpg')

    vehicle3 = Vehicle(year=2023, make='Ride1Up', model='Cafe Cruiser', power='electric', daily_price=35,
                       description='The bike Im currently riding is the Ride1Up Cafe Cruiser with the passenger kit. Any bike at this price point is not going to feel as nice or natural',
                       type='e-bike', passengers=6, host_id=3, picture='https://electrek.co/wp-content/uploads/sites/3/2021/12/Cafe-Cruiser-cropped.jpg?quality=82&strip=all&w=980')

    vehicle4 = Vehicle(year=2023, make='VanMook', model='Cowboy4 St', power='electric', daily_price=26,
                       description='This is straight up classy as far as bikes go',
                       type='e-bike', passengers=1, host_id=4, picture='https://cdn.vox-cdn.com/thumbor/noYL-sc10u0f_R_Sc3Zukg6vBtU=/0x0:2040x1351/2400x1356/filters:focal(1047x990:1048x991)/cdn.vox-cdn.com/uploads/chorus_asset/file/21907037/verge_DSC_0771_2040pxl.jpg')

    vehicle5 = Vehicle(year=2023, make='LeMond', model='Prolog', power='electric', daily_price=50,
                       description='has an insanely light frame, a stunning matte paint job, and fancy-schmancy custom-designed fenders. It also has reliable components made by well-known manufacturers—a one-button Mahle drive system',
                       type='e-bike', passengers=1, host_id=4, picture='https://cloudfront-us-east-1.images.arcpublishing.com/octane/OV5WAPDVVNCZDDIO4K3T3ZWCD4.jpg')
# or should it be host = user1 or johnny

    db.session.add(vehicle1)
    db.session.add(vehicle2)
    db.session.add(vehicle3)
    db.session.add(vehicle4)
    db.session.add(vehicle5)
    vehicle2.fav_by_users.append(demo)
    db.session.commit()


def undo_vehicles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.vehicles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM vehicles")
        db.session.execute("DELETE FROM favorites")

    db.session.commit()
