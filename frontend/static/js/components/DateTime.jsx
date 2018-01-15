import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from '.'


class DateTime extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor(props){
    super(props)

    this.state = {
      dateFormatter: new Intl.DateTimeFormat('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    }
  }

  render() {
    const { children, className } = this.props
    const { dateFormatter } = this.state

    return (
      <time dateTime={children.toString()} className={className}>
        <Icon name="calendar-o"/>
        {dateFormatter.format(new Date(children))}
      </time>
    )
  }
}

export default styled(DateTime)`
  .fa {
    margin-right: 12px;
  }
`
