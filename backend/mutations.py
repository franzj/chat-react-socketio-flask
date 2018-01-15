import graphene
from flask_jwt_extended import get_jwt_identity

from backend.types import UserType, MessageType, ChatType
from backend.models import User, Chat


class UpdateUserProfile(graphene.Mutation):

    class Arguments:
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, **kwargs):
        user = User.objects(pk=get_jwt_identity()).first()

        first_name = kwargs.get('first_name')
        last_name = kwargs.get('last_name')

        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name

        user.save()

        return UpdateUserProfile(user)


class CreateChat(graphene.Mutation):

    class Arguments:
        email = graphene.String(required=True)

    chat = graphene.Field(ChatType)

    @staticmethod
    def mutate(root, info, **kwargs):
        user = User.objects(email=kwargs.get('email')).first()
        if not user:
            raise Exception('El usuario no existe')

        chat = Chat.objects(users__in=[user])
        if chat:
            raise Exception('Ya hay un chat con el usuario')

        chat = Chat(users=[User.objects(pk=get_jwt_identity()).first(), user]).save()
        return CreateChat(chat)


class Mutation(graphene.ObjectType):
    update_user = UpdateUserProfile.Field()
    create_chat = CreateChat.Field()
