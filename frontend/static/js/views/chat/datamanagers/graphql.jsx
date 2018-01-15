import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link'


const httpLink = new HttpLink({
  uri: '/graphql/',
  credentials: 'same-origin',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem("JWT")}` || null,
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

export {
  client
}
