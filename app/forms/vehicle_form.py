from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import Length, DataRequired, NumberRange, Optional


class VehicleForm(FlaskForm):
    year = IntegerField('Year')
    make = StringField('Make', validators=[DataRequired()])
    model = StringField('Model', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    power = StringField('Power', validators=[DataRequired()])
    passengers = IntegerField('Passengers')
    picture = StringField('Picture', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    submit = SubmitField('Submit')