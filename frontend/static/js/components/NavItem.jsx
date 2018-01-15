import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from '.'
import { blue, dark, light, border, shadow } from '../utils/colors'


class NavItem extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    link: PropTypes.string.isRequired,
    dropdown: PropTypes.bool,
    items: PropTypes.array
  }

  render() {
    const { className, label, link, dropdown, items } = this.props

    if (dropdown) {
      return(
        <li className={className}>
          <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
            {label}
            <Icon name="caret-down"/>
          </a>
          <div className="dropdown-menu">
            {items.map((item, key) => {
              if (typeof item === "string") {
                return (
                  <a
                    key={key}
                    href="#"
                    className="dropdown-item"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item}
                  </a>
                )
              } else {
                return (
                  <item.type
                    key={key}
                    {...item.props}
                    className={
                      `dropdown-item ${item.props.className ? item.props.className: ""}`
                    }
                  />
                )
              }
            })}
          </div>
        </li>
      )
    } else {
      return(
        <li className={className}>
          <Link to={link} className="nav-link">
            {label}
          </Link>
        </li>
      )
    }
  }
}

export default styled(NavItem)`
  position: relative;
  margin-left: 22px;

  .nav-link {
    color: ${dark};
    font-size: 18px;

    .fa {
      margin-left: 12px;
    }

    &:focus ~ .dropdown-menu,
    &:active ~ .dropdown-menu {
      display: flex;
    }
  }

  .dropdown-menu {
    background-color: ${light.normal};
    border: 1px solid ${shadow};
    border-radius: 10px;
    box-shadow: 0 0 25px ${shadow};
    display: none;
    left: auto;
    flex-direction: column;
    margin: 16px 0;
    padding: 16px 0;
    position: absolute;
    right: 0;
    width: 240px;
    z-index: 100;

    &::after {
      border-color: transparent transparent ${light.normal} transparent;
      border-style: solid;
      border-width: 0 12px 15px 12px;
      content: " ";
      position: absolute;
      top: -12px;
      right: 8px;
    }

    &:hover {
      display: flex;
    }

    .dropdown-item {
      padding: 6px 24px;

      &:hover {
        background-color: ${blue.light};
        color: ${light.normal};
      }

      .fa {
        margin-right: 12px;
      }
    }
  }
`
