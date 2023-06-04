from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Optional

class BookingForm(FlaskForm):
    pickup_date = DateTimeField('Pickup Date', validators=[DataRequired()])
    drop_off_date = DateTimeField('Drop Off Date', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    submit = SubmitField('Book')
