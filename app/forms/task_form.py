from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    body = StringField("Body", validators=[DataRequired(message="Must add text to create a note")])
    notebook = SelectField("Notebooks", validators=[DataRequired(message="Must select a notebook")], coerce=int)