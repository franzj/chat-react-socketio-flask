import React, { Component } from 'react'
import styled from 'styled-components'
import { Alert, Button, Icon, TextInput } from 'components'
import { blue, red, green, light, shadow } from 'utils/colors'


class UpdateProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: ""
    }
    this.save = this.save.bind(this)
    this.onChangeFirstName = this.onChangeFirstName.bind(this)
    this.onChangeLastName = this.onChangeLastName.bind(this)
  }

  save(e) {
    e.preventDefault()
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
    const { firstName, lastName, loading, showAlert } = this.state
    const { errorMessage, className } = this.props

    return (
      <form onSubmit={this.save} className={className}>
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
          onChange={() => {}}
        />
        <TextInput
          required
          type="password"
          icon="lock"
          pattern=".{5,}"
          value={password}
          label="Contraseña"
          errorMessage="La contraseña debe de ser mayor a 5 caracteres"
          onChange={() => {}}
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
          <Icon name={loading ? "circle-o-notch fa-spin": "save-o"}/>
          Guardar Cambios
        </Button>
      </form>
    )
  }
}

export default styled(UpdateProfileForm)`
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
