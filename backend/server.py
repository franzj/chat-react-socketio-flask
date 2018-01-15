import os
from flask import Flask
from backend.settings import Development, Production
from backend.models import db
from backend.views import views
from backend.autorization import jwt
from backend.events import socketio

app = Flask(__name__)

if os.environ.get('PRODUCTION') == 1:
    app.config.from_object(Production)
else:
    app.config.from_object(Development)

db.init_app(app)
jwt.init_app(app)
app.register_blueprint(views)
socketio.init_app(app)
