from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Note, db, Notebook
from app.forms import NoteForm

notes_routes = Blueprint("notes", __name__)


def validation_errors_to_error_messages(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f"{error}")
    return error_messages


@notes_routes.route("")
@login_required
def notes():
    notes = Note.query.filter(Note.author_id == current_user.id)
    return {note.to_dict()["id"]: note.to_dict() for note in notes}


@notes_routes.route("/<int:id>")
@login_required
def single_note(id):
    note = Note.query.get(id)
    return note.to_dict()


@notes_routes.route("/new", methods=["POST"])
@login_required
def new_notes():
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    notebook_options = Notebook.query.filter(current_user.id == Notebook.owner_id)
    form.notebooks.choices = [(n.id, n.name) for n in notebook_options]
    if form.validate_on_submit():
        if form.data["title"] == "":
            # title_list = form.data["body"].split(" ")[0]
            title_list = "Untitled"
        else:
            title_list = form.data["title"]
        note = Note(
            title=title_list,
            body=form.data["body"],
            author_id=current_user.id,
            notebook_id=form.notebooks.data,
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@notes_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_note(id):
    note = Note.query.get(id)
    if current_user.id == note.author_id:
        form = NoteForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        notebook_options = Notebook.query.filter(current_user.id == Notebook.owner_id)
        form.notebooks.choices = [(n.id, n.name) for n in notebook_options]
        if form.validate_on_submit():
            note.title = form.data["title"]
            note.body = form.data["body"]
            note.notebook_id = form.notebooks.data
            db.session.add(note)
            db.session.commit()
            return note.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401
    return {"errors": ["Unauthorized"]}


@notes_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_note(id):
    note = Note.query.get(id)
    if current_user.id == note.author_id:
        db.session.delete(note)
        db.session.commit()
        return {"data": "Deleted"}
    return {"errors": ["Unauthorized"]}
