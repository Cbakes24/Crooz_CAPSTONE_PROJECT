from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange


class ReviewForm(FlaskForm):
    body = StringField('Body', validators=[DataRequired(), Length(max=1000)])
    rating = FloatField('Rating', validators=[DataRequired(), NumberRange(min=0, max=10)])
