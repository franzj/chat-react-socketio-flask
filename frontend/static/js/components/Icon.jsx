import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  render() {
    const { name, className } = this.props
    return <i className={`fa fa-${name} ${className}`} />
  }
}

export default Icon
