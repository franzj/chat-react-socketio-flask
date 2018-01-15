import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'


class Animate extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  }

  render() {
    const { children, className } = this.props

    return (
      <div className={className}>
        { children }
      </div>
    )
  }
}


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default styled(Animate)`
  animation: .5s ${fadeIn} ease-in;
  margin: 0 10%;
  margin-top: 96px;
  padding: 8px 0;
  width: 80%;
`
