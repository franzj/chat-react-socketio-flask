import React, { Component } from 'react'
import { Animate } from 'components'
import { LoginForm } from '../containers'


class Login extends Component {
  render() {
    return (
      <Animate>
        <center>
          <LoginForm/>
        </center>
      </Animate>
    )
  }
}

export default Login
