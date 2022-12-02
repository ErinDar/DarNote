from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


class SignUpForm(FlaskForm):
    first_name = StringField(
        "First name", validators=[DataRequired(message="First name is required")]
    )
    last_name = StringField(
        "Last name", validators=[DataRequired(message="Last name is required")]
    )
    email = StringField(
        "Email",
        validators=[
            DataRequired(message="An email is required"),
            Email(message="Please enter a valid email"),
            user_exists,
        ],
    )
    password = StringField("Password", validators=[DataRequired()])
