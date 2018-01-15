import React, { Component } from 'react'
import styled from 'styled-components'
import { Alert, Button, Icon, TextInput } from 'components'
import { blue, red, green, light, shadow } from 'utils/colors'


class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.login = this.login.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  login(e) {
    e.preventDefault()

    const { email, password } = this.state

    this.setState({ loading: true })

    fetch("/auth", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.JWT) {
        localStorage.setItem("JWT", json.JWT)
        // Refirecionamos al index
        window.location.href = "/"

      } else if (json.msg) {
        this.setState({
          showAlert: true,
          msg: json.msg,
          loading: false
        })
      } else {
        new Error("Unknown")
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({ loading: false })
    })
  }

  onChangePassword(value) {
    this.setState({
      password: value
    })
  }

  onChangeEmail(value) {
    this.setState({
      email: value
    })
  }

  render() {
    const { email, password, loading, showAlert } = this.state
    const { errorMessage, className } = this.props

    return (
      <form onSubmit={this.login} className={className}>
        <img className="logo" src="/static/img/logo.png" height="128" width="128" alt="logo"/>
        {showAlert ?
          <Alert type="danger" position="default"
            duration="forever" icon="warning"
            onClose={() => this.setState({ showAlert: false })}
          >
            {this.state.msg}
          </Alert> : null
        }
        <TextInput
          required
          type="email"
          icon="user"
          value={email}
          label="Correo Electrónico"
          pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"}
          errorMessage="No es un correo electrónico válido"
          onChange={this.onChangeEmail}
        />
        <TextInput
          required
          type="password"
          icon="lock"
          pattern=".{5,}"
          value={password}
          label="Contraseña"
          errorMessage="La contraseña debe de ser mayor a 5 caracteres"
          onChange={this.onChangePassword}
        />
        <Button
          type="submit"
          color="success"
          disabled={loading}
        >
          <Icon name={loading ? "circle-o-notch fa-spin": "sign-in"}/>
          Iniciar Sesión
        </Button>
      </form>
    )
  }
}

export default styled(LoginForm)`
  background: ${light.normal};
  border: 1px solid ${shadow};
  border-radius: 10px;
  box-shadow: 0 0 25px ${shadow};
  display: flex;
  flex-direction: column;
  padding: 16px 16px 32px 16px;
  position: relative;
  width: 380px;
  text-align: left;

  .logo {
    margin: 0 auto 24px auto;
  }

  .alert {
    margin-bottom: 32px!important;
  }

  .space {
    text-align: center;
  }

  .btn {
    margin: 6px 0;
  }
`
