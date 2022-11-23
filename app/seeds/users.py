from app.models import db, User, environment, SCHEMA


def seed_users():
    demo = User(
        first_name="Demo", last_name="User", email="demo@aa.io", password="password"
    )
    sarah = User(
        first_name="Sarah",
        last_name="Rolling",
        email="sarah@aa.io",
        password="password1",
    )
    db.session.add(demo)
    db.session.add(sarah)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
