from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from mongoengine import connect
from dotenv import load_dotenv

import os

def create_app():
    load_dotenv()
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "LMS")

    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)

    # MongoDB Connection
    connect(db=os.getenv('PG_DATABASE', 'license-db'), 
            host=os.getenv('PG_HOST', 'localhost'), 
            port=int(os.getenv('PG_PORT', 27017)))

    CORS(app)

    from app.routes import blueprints

    for bp, url_prefix in blueprints:
        app.register_blueprint(bp, url_prefix=url_prefix)

    return app