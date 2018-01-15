import React, { Component } from 'react'
import { graphql  } from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Perfil } from './views'
import { Navigation, Congratulations } from './containers'
import { CurentUserQuery } from './datamanagers/queries'


class Routers extends Component {
  render() {
    const { data: { loading, me } } = this.props

    return (
      loading ? <div>cargando...</div> :
        <Router>
          <div>
            <Navigation user={me}/>
            <Route exact path="/" component={Home}/>
            <Route path="/perfil" component={Perfil}/>
          </div>
        </Router>
    )
  }
}

export default graphql(CurentUserQuery)(Routers)
