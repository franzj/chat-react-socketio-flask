import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from '.'
import { blue, red, green } from '../utils/colors'


class TextInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password']),
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    pattern: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      error: false,
      errorClass: ""
    }

    this.onBlur = this.onBlur.bind(this)
    this.onInvalid = this.onInvalid.bind(this)
  }

  onBlur(e) {
    const { pattern, value } = this.props

    if (pattern && !(new RegExp(`^${pattern}$`)).test(value)) {
      this.setState({
        error: true,
        errorClass: value !== "" ? "error-with-content" : "error-without-content"
      })
    } else {
      this.setState({
        error: false,
        errorClass: "",
      })
    }
  }

  onInvalid(e) {
    e.preventDefault()
    const { value } = this.props

    this.setState({
      error: true,
      errorClass: value !== "" ? "error-with-content" : "error-without-content"
    })
  }

  render() {
    const { error, errorClass } = this.state
    const { type, icon, label, value, pattern, required, autoFocus, onChange, className, errorMessage } = this.props

    return (
      <div className={className}>
        <div className={errorClass}>
          <input
            type={type}
            value={value}
            pattern={pattern}
            required={required}
            onBlur={this.onBlur}
            autoFocus={autoFocus}
            onInvalid={this.onInvalid}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="highlight"/>
          <span className="bar"/>
          <label>
            {icon ? <Icon name={icon}/> : null}
            {label}
          </label>
          {error ? <span className="msg-error">* {errorMessage}</span> : null}
        </div>
      </div>
    )
  }
}

export default styled(TextInput)`
  box-sizing: border-box;
  margin-bottom: 32px;
  min-width: 120px;
  position: relative;
  width: auto;

  input {
    box-shadow: none;
    box-sizing: border-box;
    border: none;
    border-bottom:1px solid ${blue.dark};
    display: block;
    font-size:18px;
    padding: 10px 10px 10px 5px;
    width: 100%;

    &:focus {
      outline: none;
    }

    &:focus ~ label, &:valid ~ label {
      color: ${blue.normal};
      font-size: 14px;
      top: -20px!important;
    }

    &:focus ~ .bar:before, &:focus ~ .bar:after {
      width: 50%;
    }

    &:focus ~ .highlight {
      animation:inputHighlighter 0.3s ease;
    }
  }

  label {
    color: ${blue.normal};
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;

    transition: 0.2s ease all;
  }

  .fa {
    margin-right: 8px;
  }

  .msg-error {
    color: ${red.normal};
    font-size: 13px;
    font-weight: lighter;
  }

  .bar {
    display: block;
    position: relative;
    width: 100%;

    &::before, &::after {
      background: ${blue.normal};
      bottom: 1px;
      content: '';
      height: 2px;
      position: absolute;
      width: 0;

      transition: 0.2s ease all;
    }

    &::before {
      left: 50%;
    }

    &::after {
      right: 50%;
    }
  }

  .highlight {
    height: 60%;
    left: 0;
    position: absolute;
    pointer-events: none;
    opacity: 0.5;
    width: 100px;
    top: 25%;
  }

  .error-with-content, .error-without-content {
    input {
      border-bottom:1px solid ${red.normal};

      &:focus ~ label, &:valid ~ label {
        color: ${red.normal};
      }
    }

    .bar {
      &::before, &::after {
        background: ${red.normal};
      }
    }

    label {
      color: ${red.normal}
    }
  }

  .error-with-content {
    input {
      &:invalid ~ label {
        top: -20px!important;
      }
    }
  }
`
