from flask import Flask
from .config.config import Config
from .models.models import db
from .router.router import main_bp



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)


    app.register_blueprint(main_bp)

    return app

