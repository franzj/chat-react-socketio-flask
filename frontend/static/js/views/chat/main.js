import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { client } from './datamanagers/graphql'
import Routers from './Routers'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routers />
  </ApolloProvider>,
  document.getElementById('app')
)
