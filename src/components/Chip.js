import React, { Component } from 'react'
import PlainChip from './PlainChip'

class Chip extends Component {
  handleClick = () => {
    if (this.props.isSelecting) {
      this.props.onStopSelecting()
    } else {
      this.props.onStartSelecting()
    }
  }

  render() {
    return (
      <PlainChip
        color={this.props.color}
          onClick={this.handleClick}
      >
          {this.props.isSelecting
            ? 'select color'
            : 'click to select color'
          }
      </PlainChip>
    )
  }
}

export default Chip
