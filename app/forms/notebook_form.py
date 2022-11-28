from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired,Length


class NotebookForm(FlaskForm):
    name = StringField(
        "Name",
        validators=[
            DataRequired(message="A name is required for notebooks"),
            Length(
                min=3,
                message="Notebooks must have a name with a minimum of 3 characters",
            ),
        ],
    )
