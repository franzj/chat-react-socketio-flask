import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { blue, green, yellow, red, shadow, light, dark } from 'utils/colors'


class Button extends Component {
  static propTypes = {
    color: PropTypes.oneOf(["primary", "success", "warning", "danger"]).isRequired,
    type: PropTypes.oneOf(["link", "button", "submit"]).isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { type, color, className, children } = this.props

    if (type === "link") {
      return (
        <Link {...this.props} className={`${className} ${color}`}>
          {children}
        </Link>
      )
    } else {
      return (
        <button {...this.props} className={`${className} ${color}`}>
          {children}
        </button>
      )
    }
  }
}


export default styled(Button)`
  border-radius: 20px;
  box-shadow: 0 0 25px ${shadow};
  color: ${light.normal};
  padding: 8px 12px;
  margin: 6px;

  .fa {
    margin-right: 12px;
  }

  &.primary {
    background-color: ${blue.light};
    border: 2px solid ${blue.normal};

    &:hover {
      background-color: ${blue.dark}
    }
  }

  &.success {
    background-color: ${green.light};
    border: 2px solid ${green.normal};

    &:hover {
      background-color: ${green.dark}
    }
  }

  &.warning {
    background-color: ${yellow.light};
    border: 2px solid ${yellow.normal};
    color: ${dark};

    &:hover {
      background-color: ${yellow.dark}
    }
  }

  &.danger {
    background-color: ${red.light};
    border: 2px solid ${red.normal};

    &:hover {
      background-color: ${red.dark}
    }
  }
`
