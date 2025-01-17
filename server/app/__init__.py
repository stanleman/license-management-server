from flask import Flask
from flask_cors import CORS
from mongoengine import connect
from dotenv import load_dotenv

import os

def create_app():
    load_dotenv()
    app = Flask(__name__)

    # MongoDB Connection
    connect(db=os.getenv('PG_DATABASE', 'license-db'), 
            host=os.getenv('PG_HOST', 'localhost'), 
            port=int(os.getenv('PG_PORT', 27017)))

    CORS(app)

    # Register Blueprints
    # from app.routes.items import items_bp
    # from app.routes.users import users_bp

    # app.register_blueprint(items_bp)
    # app.register_blueprint(users_bp)

    return app