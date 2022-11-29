from .db import db, environment, SCHEMA, add_prefix_for_prod

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40))
    body = db.Column(db.String, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")))
    # note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id")))

    creator = db.relationship("User", back_populates="tasks")
    # notes = db.relationship("Note", back_populates="")

    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "author_id": self.author_id,
            "notebook_id": self.notebook_id
        }