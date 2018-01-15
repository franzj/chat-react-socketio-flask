import React, { Component } from "react"
import styled from "styled-components"
import { Animate, Button, Icon, Title } from "components"


class Congratulations extends Component {
  render() {
    const { className } = this.props

    return (
      <Animate className={className}>
        <Title icon="info-o">Felicidades!!!</Title>
        <img src="/static/img/logo.png"/>
        <p>Te registraste exitosamente <Icon name="smile-o"/></p>
        <Button type="link" to="/login" color="success">
          <Icon name="sign-in"/>
          Iniciar Sesión
        </Button>
      </Animate>
    )
  }
}

export default styled(Congratulations)`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 28px;
  }

  img {
    margin: 16px 0;
  }

  a {
    margin-top: 24px;
  }

`
