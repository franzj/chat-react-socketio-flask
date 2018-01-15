import React, { Component } from 'react'
import styled from 'styled-components'
import { Animate, Title } from 'components'
import { RegisterForm } from '../containers'


class Home extends Component {
  render() {
    const { className } = this.props

    return (
      <Animate className={className}>
        <div className="app-home-box">
          <div className="info">
            <Title icon="comments">Inicia Chat con tus amigos!</Title>
            <br/><br/><br/>
            <center><img src="/static/img/logo.png"/></center>
          </div>
          <RegisterForm/>
        </div>
      </Animate>
    )
  }
}

export default styled(Home)`
  display: flex;
  flex-direction: column;

  .info {
    flex: 1;
    padding: 0 12px;

    h1 {
      font-size: 40px;
    }
  }

  .app-home-box {
    display: flex;
    justify-content: space-between;
  }
`
