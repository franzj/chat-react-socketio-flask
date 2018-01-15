import React, { Component } from 'react'
import { NavBar, NavItem, Icon } from 'components'


class Navigation extends Component {
  render() {
    const { user } = this.props

    return (
      <NavBar homeUrl="/">
        <NavItem link="/" label="" left/>
        <NavItem
          right
          link="/perfil"
          label={
            <span>
              <Icon name="user"/>
              {` ${user.firstName}`}
            </span>
          }
        />
      </NavBar>
    )
  }
}

export default Navigation
