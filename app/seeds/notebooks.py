from app.models import db, Notebook, environment, SCHEMA


def seed_notebooks():
    notebook1 = Notebook(name="First Notebook", owner_id=1)
    notebook2 = Notebook(name="First Notebook", owner_id=2)
    notebook3 = Notebook(name="BIO 1000", owner_id=1)

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM notebooks")
    db.session.commit()
