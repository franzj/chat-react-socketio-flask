import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { shadow, light, dark } from '../utils/colors'


class AppLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.string,
  }

  render() {
    const { children, color, to, icon, className } = this.props

    return (
      <div className={className}>
        {icon ? <i className={`fa fa-${icon}`}/> : null}
        <Link to={to} className="app-link-content">
          {children}
          <i className="fa fa-arrow-circle-right arrow"/>
        </Link>
      </div>
    )
  }
}

export default styled(AppLink)`
  background-color: ${props => props.color};
  border-radius: 10px;
  box-shadow: 0 0 25px ${shadow};
  display: flex;
  height: 120px;
  margin: 16px;
  width: 280px;

  &>.fa {
    align-items: center;
    color: ${light.normal};
    display: flex;
    justify-content: center;
    padding: 8px;
    width: 120px;

    &::before {
      font-size: 64px;
      text-shadow: 0px 0px 3px #586069;
    }
  }

  &>.app-link-content {
    border-left: inherit;
    color: ${light.normal};
    padding: 12px;
    position: relative;

    &:hover {
      text-decoration: underline;
    }

    &>.arrow {
      bottom: 6px;
      left: 0;
      position: absolute;
      width: 100%;

      &::before {
        float: right;
        font-size: 24px;
        margin-right: 8px;
        margin-top: 4px;
      }
    }
  }
`
