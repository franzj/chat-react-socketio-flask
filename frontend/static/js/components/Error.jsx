import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Loading extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['400', '401', '403', '404', '500']).isRequired,
  }

  render() {
    const { type } = this.props

    return (
      <div>
        error
      </div>
    )
  }
}

export default Loading
