import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Icon } from '.'
import { blue, yellow, red, green, light } from '../utils/colors'


class Alert extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['primary', 'success', 'warning', 'danger']),
    position: PropTypes.oneOf(['default', 'window-left', 'window-center', 'window-right']),
    duration: PropTypes.oneOfType([
      PropTypes.oneOf(["default", "forever"]),
      PropTypes.number
    ]),
    icon: PropTypes.string,
    onClose: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
  }

  onClose(e) {
    const { onClose } = this.props
    if (onClose) onClose()
  }

  render() {
    const { className, children, type, position, duration, icon } = this.props

    return (
      <div className={className}>
        <div className={`alert alert-${type}`}>
          <i className={`fa fa-times btn-close`} onClick={this.onClose}/>
          {icon ? <Icon name={icon}/> : null}
          { children }
        </div>
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

export default styled(Alert)`
  animation: .5s ${fadeIn} ease-in;

  .alert {
    align-items: center;
    border-radius: 3px;
    display: flex;
    min-height: 32px;
    padding: 6px 12px;
    position: relative;

    .btn-close {
      margin: 0!important;
      position: absolute;
      right: 3px;
      top: 1px;
    }

    .fa {
      margin-right: 8px;
    }
  }

  .alert-primary {
    background-color: ${blue.light};
    border: 1px solid ${blue.dark};
    color: ${light.normal};

    .btn-close {
      &:hover {
        color: ${blue.dark};
      }
    }
  }

  .alert-success {
    background-color: ${green.light};
    border: 1px solid ${green.dark};
    color: ${light.normal};

    .btn-close {
      &:hover {
        color: ${green.dark};
      }
    }
  }

  .alert-warning {
    background-color: ${yellow.light};
    border: 1px solid ${yellow.dark};
    color: ${light.normal};

    .btn-close {
      &:hover {
        color: ${yellow.dark};
      }
    }
  }

  .alert-danger {
    background-color: ${red.light};
    border: 1px solid ${red.dark};
    color: ${light.normal};

    .btn-close {
      &:hover {
        color: ${red.dark};
      }
    }
  }
`
