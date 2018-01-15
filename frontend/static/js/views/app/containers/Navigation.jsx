import React, { Component } from 'react'
import { NavBar, NavItem } from 'components'


class Navigation extends Component {
  render() {
    return (
      <NavBar homeUrl="/">
        <NavItem link="/" label="" left/>
        <NavItem link="/login" label="Iniciar Sesión" right/>
      </NavBar>
    )
  }
}

export default Navigation
