import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

"""empty message

Revision ID: df30724309a0
Revises: 39c199452c8f
Create Date: 2023-04-07 10:17:05.066233

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df30724309a0'
down_revision = '39c199452c8f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=40), nullable=False))

    if environment == "production":
            op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
            op.execute(f"ALTER TABLE vehicles SET SCHEMA {SCHEMA};")
            op.execute(f"ALTER TABLE bookings SET SCHEMA {SCHEMA};")
            op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###
