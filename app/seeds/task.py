from app.models import db, Task, environment, SCHEMA

def seed_task():
    task1 = Task(title="To Do List", body="cells are able to multiply", author_id=1, notebook_id=1)
    task2 = Task(title="Grocery List", body="roses are red", author_id=1, notebook_id=3)
    task3 = Task(title="demo", body="demo", author_id=2, notebook_id=2)

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.commit()


def undo_task():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM tasks")
    db.session.commit()