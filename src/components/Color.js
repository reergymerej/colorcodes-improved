import React, { Component } from 'react'
import ColorInfo from './ColorInfo'
import { getRGB, toHex } from '../util'

class Color extends Component {
  state = {
    value: '',
  }

  handleInputChange = (event) => {
    this.setState({ value: event.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value)
      }
    })
  }

  handleKeyPress = (event) => {
    if (event.which === 13) {
      event.preventDefault()
      event.stopPropagation()
      this.props.onNewColor()
    }
  }

  render() {
    const { r, g, b, name } = getRGB(this.state.value)
    let hex
    try {
      hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
    } catch (error) {
      // console.log(error)
    }

    return (
      <div className="h-24 flex border border-black mb-4" style={{background: hex }}
        onClick={() => {
          this.props.onClick({r, g, b})
        }}
      >

        <div className="flex-1 flex justify-center items-center">
          <input
            autoFocus
            value={this.state.value}
            className="text-center border border-black"
            placeholder="put color code here"
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>

        <div className="w-1/4">
          <ColorInfo
            name={name}
            r={r}
            g={g}
            b={b}
          />
        </div>

      </div>
    )
  }
}

export default Color
