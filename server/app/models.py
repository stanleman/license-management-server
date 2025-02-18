from mongoengine import Document, StringField, IntField, ListField, EmbeddedDocument, EmbeddedDocumentListField, EnumField, DateTimeField, ReferenceField
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime
from enum import Enum

class UserRole(Enum):
    ADMIN = 'admin'
    OEM = 'oem'
    OPERATOR = 'operator'

class LicenseType(Enum):
    MANUFACTURING = 'manufacturing'

class LicenseStatus(Enum):
    PENDING = 'pending'
    APPROVED = 'approved'
    REJECTED = 'rejected'

class Feature(EmbeddedDocument):
    name = StringField(required=True)

class User(Document):
    email = StringField(required=True)
    name = StringField(required=True)
    password = StringField(required=True)
    role = EnumField(UserRole, default=UserRole.OPERATOR)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode("utf-8")

    def check_password(self, password):
        return check_password_hash(self.password, password)

class License(Document):
    title = StringField(required=True)
    type = EnumField(LicenseType, required=True)
    features = EmbeddedDocumentListField(Feature)
    duration_in_months = IntField(required=True)
    notes = StringField(required=True)
    operator = ReferenceField(User, required=True)
    approved = EnumField(LicenseStatus, required=True, default=LicenseStatus.PENDING)
    created_at = DateTimeField(default=datetime.utcnow)