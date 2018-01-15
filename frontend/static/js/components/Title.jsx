import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from '.'


class Title extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.string,
  }

  render() {
    const { children, icon, className } = this.props

    return (
      <h1 className={className}>
        {icon ? <Icon name={icon}/> : null}
        { children }
      </h1>
    )
  }
}

export default styled(Title)`
  font-size: 24px;
  margin-left: 8px;

  .fa {
    margin-right: 12px;
  }
`
