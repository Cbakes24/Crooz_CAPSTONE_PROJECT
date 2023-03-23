from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class VehicleForm(FlaskForm):
    year = IntegerField('Year')
    make = StringField('Make', validators=[DataRequired()])
    model = StringField('Model', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    power = StringField('Power', validators=[DataRequired()])
    passengers = IntegerField('Passengers', validators=[DataRequired()])
    picture = StringField('Picture', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    dailyPrice = IntegerField('Daily Price', validators=[DataRequired(), NumberRange(min=1, max=999)])
    submit = SubmitField('Submit')
