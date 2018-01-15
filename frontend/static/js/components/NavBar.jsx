import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NavItem from './NavItem'
import { yellow, shadow, dark } from '../utils/colors'


class NavBar extends Component {
  static propTypes = {
    homeUrl: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    const { className, homeUrl, children } = this.props;

    return (
      <nav className={className}>
        <Link className="navbar-brand" to={homeUrl}>
          <img src="/static/img/logo.png" alt="logo" className="logo"/>
          Chat
        </Link>
        <div className="navbar-collapse">
          {/* izquierda */}
          <ul className="navbar-nav">
            {children.map((nav_item, key) =>
              (nav_item.type === NavItem && nav_item.props.left) ?
                <NavItem key={key} {...nav_item.props}/>
              : null
            )}
          </ul>
          {/* derecha */}
          <ul className="navbar-nav">
            {children.map((nav_item, key) =>
              (nav_item.type === NavItem && nav_item.props.right) ?
                <NavItem key={key} {...nav_item.props}/>
              : null
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default styled(NavBar)`
  background-color: ${yellow.light};
  box-shadow: 0 1px 0 0 ${yellow.dark}, 0 0 25px ${shadow};
  display: flex;
  height: 76px;
  padding: 0 10%;
  position: fixed;
  width: 80%;
  top: 0;
  z-index: 300;

  .navbar-brand {
    align-items: center;
    color: ${dark};
    display: flex;
    height: 100%;
    font-size: 18px;

    .logo {
      width: 56px;
      margin-right: 16px;
    }
  }

  .navbar-collapse {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .navbar-nav {
    display: flex;
  }
`
