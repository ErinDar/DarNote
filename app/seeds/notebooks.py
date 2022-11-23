from app.models import db, Notebook, environment, SCHEMA


def seed_notebooks():
    demo = Notebook(name="First Notebook", owner_id=1)
    demo2 = Notebook(name="First Notebook", owner_id=2)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM notebooks")
    db.session.commit()
