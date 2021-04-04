"""initial migration

Revision ID: dfcdbef3d0de
Revises: 
Create Date: 2021-03-27 13:05:32.294979

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dfcdbef3d0de'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('nk_register_doctor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fullname', sa.String(length=100), nullable=True),
    sa.Column('hospital', sa.String(length=200), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=True),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('passwordhash', sa.String(length=500), nullable=False),
    sa.Column('actived', sa.Boolean(), nullable=True),
    sa.Column('created_date', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('passwordhash')
    )
    op.create_table('nk_received_request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fullname', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=50), nullable=True),
    sa.Column('appointment_date', sa.Date(), nullable=True),
    sa.Column('appointment_time', sa.Time(), nullable=True),
    sa.Column('doctor', sa.Integer(), nullable=False),
    sa.Column('sent_date', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['doctor'], ['nk_register_doctor.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('nk_doctor_availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('appointment_date', sa.Date(), nullable=True),
    sa.Column('appointment_time', sa.Time(), nullable=True),
    sa.Column('notice', sa.Text(), nullable=True),
    sa.Column('patient', sa.Integer(), nullable=True),
    sa.Column('date', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['patient'], ['nk_received_request.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('nk_responsed_request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient', sa.Integer(), nullable=True),
    sa.Column('doctor', sa.Integer(), nullable=False),
    sa.Column('sent_date', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['doctor'], ['nk_register_doctor.id'], ),
    sa.ForeignKeyConstraint(['patient'], ['nk_received_request.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('nk_responsed_request')
    op.drop_table('nk_doctor_availability')
    op.drop_table('nk_received_request')
    op.drop_table('nk_register_doctor')
    # ### end Alembic commands ###
