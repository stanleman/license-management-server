from mongoengine import Document, StringField, IntField, ListField, EmbeddedDocument, EmbeddedDocumentListField, EnumField, DateTimeField, ReferenceField
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
    ISSUED = 'issued'

class Feature(EmbeddedDocument):
    name = StringField(required=True)

class User(Document):
    username = StringField(required=True)
    password = StringField(required=True)
    role = EnumField(UserRole, default=UserRole.OPERATOR)

class License(Document):
    title = StringField(required=True)
    type = EnumField(LicenseType, required=True)
    features = EmbeddedDocumentListField(Feature)
    duration_in_months = IntField(required=True)
    notes = StringField(required=True)
    operator = ReferenceField(User, required=True)
    approved = Enum(LicenseStatus, required=True, default=LicenseStatus.PENDING)
    created_at = DateTimeField(default=lambda: datetime.now(datetime.timezone.utc))
    canceled_at = DateTimeField()