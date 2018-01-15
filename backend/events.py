from flask import session
from flask_socketio import SocketIO
from flask_socketio import emit, join_room, leave_room

from .models import User, Chat, Message

socketio = SocketIO()


@socketio.on('joined', namespace='/chat')
def joined(message):
    """Envia un mensaje a los clientes cuando un usurio ingresa a una sala,"""
    room = message['room']
    join_room(room)
    emit('status', { 'msg': room }, room=room)


@socketio.on('text', namespace='/chat')
def text(message):
    """Envia un mensaje a los clientes cuando ingresa un mensaje."""
    room = message['room']
    user = User.objects(pk=message['user_id']).first()
    msg = Message(content=message['msg'], user=user)
    chat = Chat.objects(pk=room).first()
    chat.messages.append(msg)
    chat.save()
    emit('message', { 'msg': message['msg'], 'user': user }, room=room)


@socketio.on('left', namespace='/chat')
def left(message):
    """Envia un mensaje a los clientes cuando un usuario deja la sala."""
    room = message['room']
    leave_room(room)
    emit('status', {'msg': 'has left the room.'}, room=room)


@socketio.on_error(namespace='/chat')
def chat_error_handler(e):
    print('\n\n An error has occurred: ' + str(e))
