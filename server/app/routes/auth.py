import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User, UserRole

auth_bp = Blueprint('auth', __name__)

SECRET_KEY = 'LMS'

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    role = data.get("role", "operator")  # Default role is "user"

    if User.objects(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    user = User(email=email, name=name, password=password, role=UserRole(role))
    user.hash_password()
    user.save()

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.objects(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id), additional_claims={"role": user.role.value})
    return jsonify({"access_token": access_token, "role": user.role.value}), 200

# # specific role-access APIs
# from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

# @auth_bp.route("/operator-only", methods=["GET"])
# @jwt_required()
# def operator_route():
#     claims = get_jwt()
    
#     # Check if the user is an operator
#     if claims.get("role") != "operator":
#         return jsonify({"msg": "Access forbidden: Operator role required"}), 403

#     return jsonify({"message": "Welcome, Operator!"})