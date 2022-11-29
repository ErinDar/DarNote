from app.models import db, Note, environment, SCHEMA

def seed_notes():
    note1 = Note(title="Bio class lecture", body="cells are able to multiply", author_id=1, notebook_id=1)
    note2 = Note(title="Random Notes", body="roses are red", author_id=1, notebook_id=3)
    note3 = Note(title="demo", body="demo", author_id=2, notebook_id=2)

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM notes")
    db.session.commit()