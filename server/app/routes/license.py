import datetime
from flask import Blueprint, request, jsonify
from app.models import User, UserRole, License, Feature, LicenseStatus
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

license_bp = Blueprint('license', __name__)

@license_bp.route("/", methods=["POST"])
@jwt_required()
def create_license():
    user_id = get_jwt_identity()
    data = request.json

    operator = User.objects(id=user_id).first()
    if not operator:
        return jsonify({"msg": "Operator not found"}), 404

    features = [Feature(name=feature) for feature in data.get("features", [])]

    license = License(
        title=data.get("title"),
        type=data.get("type"),
        features=features,
        duration_in_months=data.get("duration_in_months"),
        notes=data.get("notes", ""),
        operator=operator
    )
    license.save()

    return jsonify({
        "msg": "License created successfully",
        "license_id": str(license.id),
        "approved": license.approved.value
    }), 201

@license_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_licenses():
    licenses = License.objects.all()  
    
    licenses_json = [license.to_mongo().to_dict() for license in licenses]

    return jsonify(licenses_json), 200

@license_bp.route('/<license_id>/status', methods=['PUT'])
@jwt_required()
def update_license_status(license_id):
    data = request.json
    claims = get_jwt()
    role = claims.get("role")

    if role not in ["admin", "oem"]:
        return jsonify({"msg": "Only admins or OEMs can approve licenses"}), 403

    license = License.objects(id=license_id).first()
    if not license:
        return jsonify({"msg": "License not found"}), 404

    license.approved = data.get("status")
    license.save()

    return jsonify({"status": license.approved, "license_id": str(license.id)})