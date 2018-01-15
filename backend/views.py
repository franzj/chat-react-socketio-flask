from flask import Blueprint, jsonify, request, render_template, current_app
from flask_graphql import GraphQLView
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, fresh_jwt_required
)
import random
import string


from backend.autorization import authenticate
from backend.models import User, Chat
from backend.schema import schema

views = Blueprint('views', __name__, template_folder='templates')

views.add_url_rule(
    '/graphql/',
    view_func=jwt_required(GraphQLView.as_view(
        'graphql',
        schema=schema
    ))
)

# Optional, for adding batch query support (used in Apollo-Client)
views.add_url_rule(
    '/graphql/batch',
    view_func=jwt_required(GraphQLView.as_view(
        'graphql-batch',
        schema=schema,
        batch=True
    ))
)

@views.route('/', defaults={'path': ''})
@views.route('/<path:path>')
def index(path):
    return render_template('index.html')


@views.route('/graphiql')
@jwt_required
def graphiql():
    return render_template('graphiql.html')


@views.route('/auth', methods=['POST'])
def auth():
    if not request.is_json:
        return jsonify({"msg": "Error mala consulta"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email:
        return jsonify({"msg": "El campo 'username' no ha sido pasado por parámetro"}), 400
    if not password:
        return jsonify({"msg": "El campo 'password' no ha sido pasado por parámetro"}), 400

    user = authenticate(email, password)
    if not user:
        return jsonify({"msg": "Usuario o contraseña incorectos"}), 401

    ret = {
        'JWT': create_access_token(identity=user),
        'EMAIL': user.email
    }
    return jsonify(ret), 200


@views.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Error mala consulta"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    firstName = request.json.get('firstName', None)
    lastName = request.json.get('lastName', None)

    if not email:
        return jsonify({"msg": "El correo electrónico es requerido"}), 400
    if not password:
        return jsonify({"msg": "La contraseña es requerida"}), 400
    if not firstName:
        return jsonify({"msg": "El nombre del usuario es requerido"}), 400
    if not lastName:
        return jsonify({"msg": "Los apellido del usuario es requerido"}), 400

    if User.objects(email=email).first():
        return jsonify({"msg": "El correo electrónico ya esta registrado"}), 400

    user = User(email=email, first_name=firstName, last_name=lastName)
    user.set_password(password)
    user.save()

    return jsonify({ "msg": "Creado con éxito" }), 200
