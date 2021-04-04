import os
import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (Column, Integer, DateTime, Boolean, String, Float, Text, ForeignKey, Date, Time)
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func 
from flask_login import UserMixin

from app import db

class NkRegisterDoctor(db.Model):
    __tablename__ = 'nk_register_doctor'
    id = Column('id', Integer, primary_key=True)
    fullname = Column(String(100), nullable=True)
    hospital = Column(String(200), nullable=False)
    function = Column(String(200), nullable=True)
    picture = Column(String(500), nullable=True)
    email = Column(String(50), unique=True)
    username = Column(String(20), unique=False, nullable=False)
    passwordhash = Column(String(500), unique=True, nullable=False)
    actived = Column(Boolean(), default=0)
    created_date = Column(DateTime(timezone=True), default=func.now())

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute')

    @password.setter 
    def password(self, password):
        self.passwordhash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.passwordhash, password)

class NkReceivedRequest(db.Model):
    __tablename__ = 'nk_received_request'
    id = Column('id', Integer, primary_key=True)
    fullname = Column(String(100), nullable=True)
    contacte = Column(String(50), nullable=True)
    appointment_date = Column(Date())
    appointment_time = Column(String(20))
    description = Column(Text())
    onhold = Column(Boolean(), default=0)
    doctor = Column(Integer, ForeignKey('nk_register_doctor.id'), nullable=False)
    sent_date = Column(DateTime(timezone=True), default=func.now())

class NkDoctoravailability(db.Model):
    __tablename__ = 'nk_doctor_availability'
    id = Column('id', Integer, primary_key=True)
    appointment_date = Column(Date())
    appointment_time = Column(String(20))
    notice = Column(Text(), nullable=True)
    patient = Column(Integer, ForeignKey('nk_received_request.id'), nullable=True)
    date = Column(DateTime(timezone=True), default=func.now())

class NKResponsedRequest(db.Model):
    __tablename__= "nk_responsed_request"
    id = Column('id', Integer, primary_key=True)
    patient = Column(Integer, ForeignKey('nk_received_request.id'), nullable=True)
    doctor = Column(Integer, ForeignKey('nk_register_doctor.id'), nullable=False)
    sent_date = Column(DateTime(timezone=True), default=func.now())
