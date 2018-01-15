from flask_mongoengine import MongoEngine
import hashlib
import datetime

db = MongoEngine()


class BaseDocument():
    created_at = db.DateTimeField(default=datetime.datetime.utcnow)
    updated_at = db.DateTimeField(required=False)


class User(db.Document, BaseDocument):
    email = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    first_name = db.StringField(required=True, max_length=50)
    last_name = db.StringField(required=True, max_length=50)

    def set_password(self, password):
        self.password = hashlib.sha256(password.encode('utf-8')).hexdigest()


class Message(db.EmbeddedDocument):
    user = db.ReferenceField(User)
    content = db.StringField()
    date = db.DateTimeField(default=datetime.datetime.utcnow)


class Chat(db.Document):
    users = db.ListField(db.ReferenceField(User), required=True)
    messages = db.EmbeddedDocumentListField(Message, default=list)
    created_at = db.DateTimeField(default=datetime.datetime.utcnow)
