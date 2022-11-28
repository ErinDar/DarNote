from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Notebook, db
from app.forms import NotebookForm

notebook_routes = Blueprint("notebooks", __name__)


def validation_errors_to_error_messages(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f"{field}: {error}")
    return error_messages


@notebook_routes.route("")
@login_required
def notebooks():
    notebooks = Notebook.query.filter(Notebook.owner_id == current_user.id)
    return {notebook.to_dict()["id"]: notebook.to_dict() for notebook in notebooks}


@notebook_routes.route("/new", methods=["POST"])
@login_required
def new_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook = Notebook(name=form.data["name"], owner_id=current_user.id)
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@notebook_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_notebook(id):
    notebook = Notebook.query.get(id)
    if current_user.id == notebook.owner_id:
        form = NotebookForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            notebook.name = form.data["name"]
            db.session.add(notebook)
            db.session.commit()
            return notebook.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401
    return {"errors": ["Unauthorized"]}


@notebook_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_notebook(id):
    notebook = Notebook.query.get(id)
    if current_user.id == notebook.owner_id:
        db.session.delete(notebook)
        db.session.commit()
        return {"data": "Deleted"}
    return {"errors": ["Unauthorized"]}
