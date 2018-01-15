import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


class Footer extends Component {
  render() {
    const { className } = this.props

    return (
      <footer className={className}>
        Copyright &copy; 2017
        <div className="links">
          <Link to="/acerca-de">Acerca de</Link>
          <Link to="/ayuda">Ayuda</Link>
          <Link to="/normas">Normas</Link>
          <Link to="/terminos">Términos de privacidad</Link>
        </div>
      </footer>
    )
  }
}

export default styled(Footer)`
  margin: 32px 0;
  text-align: center;

  .links {
    margin-top: 12px;

    a {
      font-variant: super;
      font-size: 18px;
      margin: 0 7px;
    }
  }
`
