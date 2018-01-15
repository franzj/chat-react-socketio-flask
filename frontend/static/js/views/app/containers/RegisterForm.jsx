import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Alert, Button, Icon, TextInput } from 'components'
import { blue, red, green, light, shadow } from 'utils/colors'


class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }

    this.login = this.login.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeFirstName = this.onChangeFirstName.bind(this)
    this.onChangeLastName = this.onChangeLastName.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  login(e) {
    e.preventDefault()

    const { email, password, firstName, lastName } = this.state

    this.setState({ loading: true })

    fetch("/register", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
    })
    .then(response => {
      if (response.ok) {
        this.setState({
          loading: false,
          created: true
        })
      } else {
        return response.json()
      }
    })
    .then(json => {
      if (json.msg) {
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

  onChangeFirstName(value) {
    this.setState({
      firstName: value
    })
  }

  onChangeLastName(value) {
    this.setState({
      lastName: value
    })
  }

  render() {
    const { email, password, firstName, lastName, loading, created, showAlert } = this.state
    const { errorMessage, className } = this.props

    return (
      created ? <Redirect to="/registrado"/> :
      <form onSubmit={this.login} className={className}>
        {showAlert ?
          <Alert type="danger" position="default" className="alert"
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
        <TextInput
          required
          type="text"
          icon="user"
          pattern="([A-Za-z]+(\s)*[A-Za-z]*){3,25}"
          value={firstName}
          label="Nombres"
          errorMessage="Reguerde que son solo letras no otro tipo de decaracter"
          onChange={this.onChangeFirstName}
        />
        <TextInput
          required
          type="text"
          icon="user"
          pattern="([A-Za-z]+(\s)*[A-Za-z]*){3,25}"
          value={lastName}
          label="Apellidos"
          errorMessage="Reguerde que son solo letras no otro tipo de decaracter"
          onChange={this.onChangeLastName}
        />
        <Button
          type="submit"
          color="success"
          disabled={loading}
        >
          <Icon name={loading ? "circle-o-notch fa-spin": "sign-in"} />
          Registrarme
        </Button>
      </form>
    )
  }
}

export default styled(RegisterForm)`
  background: ${light.normal};
  border: 1px solid ${shadow};
  border-radius: 10px;
  box-shadow: 0 0 25px ${shadow};
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  position: relative;
  width: 380px;
  text-align: left;

  .alert {
    margin-bottom: 24px;
  }

  .space {
    text-align: center;
  }

  .btn {
    margin: 6px 0;
  }
`
