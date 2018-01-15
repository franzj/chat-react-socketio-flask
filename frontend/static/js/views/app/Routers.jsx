import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Login } from './views'
import { Navigation, Congratulations } from './containers'
import { Footer } from 'components'

class Routers extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation/>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/registrado" component={Congratulations}/>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default Routers
