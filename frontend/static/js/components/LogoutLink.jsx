import React, { Component } from 'react'
import PropTypes from 'prop-types'


class LogoutLink extends Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()
    localStorage.clear()
    window.location.href = "/";
  }

  render() {
    const { className, icon } = this.props

    return(
      <a href="#" className={className} onClick={this.logout}>
        {icon ? <i className={`fa fa-${icon}`}/> : null}
        Salir
      </a>
    )
  }
}

export default LogoutLink
