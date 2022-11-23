from .db import db, environment, SCHEMA, add_prefix_for_prod


class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40))
    body = db.Column(db.String, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    notebook_id = db.Column(db.Integer, db.ForeignKey)
