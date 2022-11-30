from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Task, db, Notebook
from app.forms import TaskForm

task_routes = Blueprint("task", __name__)

def validation_errors_to_error_messages(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f"{field}: {error}")
    return error_messages

@task_routes.route("")
@login_required
def get_task():
    task = Task.query.filter(Task.author_id == current_user.id)
    return {t.to_dict()["id"]: t.to_dict() for t in task}

@task_routes.route("/new", methods=["POST"])
@login_required
def new_task():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    notebook_options = Notebook.query.filter(current_user.id == Notebook.owner_id)
    form.notebooks.choices = [(t.id, t.name) for t in notebook_options]
    if form.validate_on_submit():
        task = Task(title="Things To Do", body=form.data["body"], author_id=current_user.id, notebook_id=form.notebooks.data)
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_task(id):
    task = Task.query.get(id)
    if current_user.id == task.author_id:
        form = TaskForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        notebook_options = Notebook.query.filter(current_user.id == Notebook.owner_id)
        form.notebooks.choices = [(t.id, t.name) for t in notebook_options]
        if form.validate_on_submit():
            task.body = form.data['body']
            task.notebook_id = form.notebooks.data
            db.session.add(task)
            db.session.commit()
            return task.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401
    return {"errors": ["Unauthorized"]}

@task_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_note(id):
    task = Task.query.get(id)
    if current_user.id == task.author_id:
        db.session.delete(task)
        db.session.commit()
        return {"data": "Deleted"}
    return {"errors": ["Unauthorized"]}