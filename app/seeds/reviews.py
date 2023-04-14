from app.models.review import db, Review, environment, SCHEMA


def seed_reviews():
    review1 = Review(
        rating=9, body='This was a lovely golf cart that got me and my friends around so easily!',
        user_id=5, vehicle_id=1, booking_id=7)

    review2 = Review(
        rating=10, body="Super easy and fun to drive",
        user_id=6, vehicle_id=2, booking_id=8)

    review3 = Review(
        rating=9, body='I love this ebike it makes me wanna just buy one',
        user_id=2, vehicle_id=5, booking_id=9)



    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
