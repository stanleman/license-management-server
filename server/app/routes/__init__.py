from .auth import auth_bp
from .license import license_bp

blueprints = [
    (auth_bp, '/auth'),
    (license_bp, '/license')
]