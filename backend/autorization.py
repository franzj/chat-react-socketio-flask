from flask import render_template, request, jsonify
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import JWTManager
import hashlib

from backend.models import User

jwt = JWTManager()

def authenticate(email, password):
    user = User.objects(email=email).first()
    if user and safe_str_cmp(
        user.password.encode('utf-8'),
        hashlib.sha256(password.encode('utf-8')).hexdigest()
    ):
        return user
    return None


@jwt.user_identity_loader
def user_identity_lookup(user):
    return str(user.pk)


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return { 'email': identity.email }


@jwt.expired_token_loader
def my_expired_token_callback():
    return (
        jsonify({
            'status': 401,
            'sub_status': 42,
            'msg': 'El token ha expirado'
        }), 401
    )

@jwt.unauthorized_loader
def custom_unauthorized_loader(context):
    if request.is_json:
        return jsonify({"msg": "Usuario no autentificado"}), 401
    return render_template('graphiql.html')
