import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql://root@localhost/ecom')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
