import graphene
from flask_jwt_extended import get_jwt_identity
from graphene.types import datetime

from backend.models import User, Chat
from backend.types import UserType, MessageType, ChatType


class Query(graphene.ObjectType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType, page=graphene.Int())
    user = graphene.Field(
        UserType,
        id=graphene.ID(),
        email=graphene.String()
    )
    chats = graphene.List(ChatType)
    messages = graphene.List(
        MessageType,
        chat=graphene.ID(required=True),
        page=graphene.Int(required=True)
    )

    def resolve_me(self, args, **kwargs):
        user = User.objects(pk=get_jwt_identity()).first()
        if user:
            return user
        raise Exception('El usuario no está en sesión!')

    def resolve_users(self, args, **kwargs):
        page = kwargs.get('page')
        if page and page > 0:
            page = page - 1
            return User.objects[page * 10 : page * 10 + 10]
        return User.objects[:10]

    def resolve_user(self, args, **kwargs):
        id = kwargs.get('id')
        email = kwargs.get('email')

        if id:
            return User.objects(pk=id).first()
        elif email:
            return User.objects(email=email).first()
        else:
            raise Exception('Mala consulta!')

    def resolve_chats(self, args, **kwargs):
        user = User.objects(pk=get_jwt_identity()).first()
        return Chat.objects.filter(users__in=[user])

    def resolve_messages(self, args, **kwargs):
        page = kwargs.get('page')
        chat = Chat.objects(pk=kwargs.get('chat')).first()

        if chat:
            return chat.messages
        else:
            raise Exception('Aun no tienen una conversación!')
