import graphene
from graphene.types import datetime, Scalar


class UserType(graphene.ObjectType):
    id = graphene.ID()
    email = graphene.String(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    created_at = datetime.DateTime()
    updated_at = datetime.DateTime()


class MessageType(graphene.ObjectType):
    user = graphene.Field(UserType)
    content = graphene.String(required=True)
    date = datetime.DateTime(required=True)


class ChatType(graphene.ObjectType):
    id = graphene.ID()
    users = graphene.List(UserType)
    messages = graphene.List(MessageType)
    created_at = datetime.DateTime()
