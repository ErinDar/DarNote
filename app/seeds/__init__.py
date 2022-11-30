from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebooks import seed_notebooks, undo_notebooks
from .notes import seed_notes, undo_notes
from .task import seed_task, undo_task

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    if environment == "production":
        undo_users()
        undo_notebooks()
        undo_notes()
        undo_task()
    seed_users()
    seed_notebooks()
    seed_notes()
    seed_task()


@seed_commands.command("undo")
def undo():
    undo_users()
    undo_notebooks()
    undo_notes()
    undo_task()
