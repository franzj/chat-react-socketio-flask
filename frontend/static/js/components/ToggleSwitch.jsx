import React, { Component } from 'react'
import styled from 'styled-components'
import { blue, green, yellow, red, shadow, light, dark } from 'utils/colors'


class ToggleSwitch extends Component {
  render() {
    const { className, placeholder, onChecked } = this.props

    return (
      <label className={className}>
        <span className="placeholder">{placeholder}</span>
        <input type="checkbox" onChange={e => onChecked(e.target.checked)} />
        <span className="slider round"></span>
      </label>
    )
  }
}


export default styled(ToggleSwitch)`
  align-items: center !important;
  cursor: pointer;
  display: flex !important;
  height: 34px;
  position: relative;
  width: 60px;

  .placeholder {
    color: ${dark};
    font-weight: lighter;
    margin-left: calc(100% + 12px);
  }

  input {
    display: none;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${shadow};
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: ${green.light};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${green.dark};
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`
