from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
#from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
	#form=FlaskForm(csrf_enabled=False) 
    uname = TextField('Username:', validators=[validators.required()])
    pword = TextField('Password:', validators=[validators.required()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')
