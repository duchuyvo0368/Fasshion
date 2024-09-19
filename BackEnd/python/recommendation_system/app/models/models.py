# app/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    asin = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    contentHTML = db.Column(db.Text)
    contentMarkdown = db.Column(db.Text)
    statusId = db.Column(db.Integer)
    categoryId = db.Column(db.Integer)
    view = db.Column(db.Integer)
    madeby = db.Column(db.String(50))
    material = db.Column(db.String(50))
    brandId = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime)
    updatedAt = db.Column(db.DateTime)
