import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { yellow, shadow, dark } from '../utils/colors'


class Loading extends Component {
  static propTypes = {
    progress: PropTypes.string.isRequired,
    icon: PropTypes.bool,
  }

  render() {
    const { progress, icon, className } = this.props

    return (
      <div className={`${className} ${icon ? 'progress-icon': ''}`}>
        <div className="progress-bar" style={{ width: `${progress}` }} />
      </div>
    )
  }
}

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export default styled(Loading)`
  align-items: center;
  border: solid 1px #43d854;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  left: calc(50% - 150px) !important;
  position: absolute;
  top: 50%;
  width: 300px;

  &>.progress-bar {
    background-color: #43d854;
    border-radius: 4px;
    height: 5px;
    width: 0;
    transition: width 1s linear;
  }

  .progress-icon {
    &::before {
      background-image: url("/static/img/loading.svg");
      bottom: 44px;
      content: " ";
      font-size: 14px;
      height: 64px;
      left: 115px;
      position: absolute;
      width: 64px;

      animation: ${rotation} 2s infinite linear;
    }
  }
`
