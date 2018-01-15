import graphene

from backend.queries import Query
from backend.mutations import Mutation


schema = graphene.Schema(query=Query, mutation=Mutation)
