import React, { Component } from 'react'
import GraphiQL from 'graphiql'


class GraphiqlView extends Component {
  constructor(props) {
    super(props)

    const JWT = localStorage.getItem("JWT")

    this.state = {
      loged: JWT ? JWT : false,
      email: "",
      password: "",
      JWT: JWT
    }

    graphiql = document.getElementById("graphiql")
    graphiql.style.width = `${window.innerWidth}px`
    graphiql.style.height = `${window.innerHeight}px`

    this.login = this.login.bind(this)
    this.graphQLFetcher = this.graphQLFetcher.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  login(e) {
    e.preventDefault()

    const { email, password } = this.state

    fetch(window.location.origin + '/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    .then(response => response.json())
    .then(json => {
      const { JWT, USER_TYPE, msg } = json

      if (JWT && USER_TYPE) {
        this.setState({
          loged: true,
          "JWT": JWT
        })

        localStorage.setItem("JWT", JWT)
        localStorage.setItem("USER_TYPE", USER_TYPE)

      } else {
        alert(msg)
      }
    })
    .catch(err => {
      console.log('Error: ', err)
    })
  }

  onChangeEmail(value) {
    this.setState({
      email: value
    })
  }

  onChangePassword(value) {
    this.setState({
      password: value
    })
  }

  graphQLFetcher(graphQLParams) {
    return fetch(window.location.origin + '/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.JWT}`
      },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json())
  }

  render() {
    const { loged } = this.state

    if (loged) {
      return <GraphiQL fetcher={this.graphQLFetcher}/>
    } else {
      return (
        <form onSubmit={this.login}>
          <label>
            Correo Electrónico
            <input type="email" onChange={(e) => this.onChangeEmail(e.target.value)}/>
          </label>
          <label>
            Contraseña
            <input type="password" onChange={(e) => this.onChangePassword(e.target.value)}/>
          </label>
          <button type="submit">
            Iniciar sesión
          </button>
        </form>
      )
    }
  }
}

export default GraphiqlView
