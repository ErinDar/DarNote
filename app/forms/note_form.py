from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired

class NoteForm(FlaskForm):
    title = StringField("Title")
    body = StringField("Body")
    notebooks = SelectField("Notebooks", validators=[DataRequired(message="Must select a notebook")], coerce=int)