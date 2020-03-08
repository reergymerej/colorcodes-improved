import React, { Component } from 'react';
import { connect } from 'react-redux'
import { increment, decrement } from '../actions'
import ColorInfo from './ColorInfo'

const rgbPattern = /.+?(\d+).*?,.*?(\d+).*?,.*?(\d+)/
const hexPattern = /#?([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/i

const parseRGB = (string) => {
  const matches = rgbPattern.exec(string)
  if (matches) {
    const [, r, g, b] = matches
    return {
      r: parseInt(r, 10),
      g: parseInt(g, 10),
      b: parseInt(b, 10),
    }
  }
  throw new Error(`invalid rgb: ${string}`)
}

const parseHex = (string) => {
  const matches = hexPattern.exec(string)
  if (matches) {
    const [, r, g, b] = matches
    return {
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16),
    }
  }
  throw new Error(`invalid rgb: ${string}`)
}

const isRGB = (value) => rgbPattern.test(value)
const isHex = (value) => hexPattern.test(value)

const getRGB = (value) => {
  if (isRGB(value)) {
    return parseRGB(value)
  } else if (isHex(value)) {
    return parseHex(value)
  }
  return {}
}

class App extends Component {
  state = {
    value: '#c80f0a',
  }

  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { r, g, b } = getRGB(this.state.value)
    const name = ''

    return (
      <div className="container mx-auto my-8">
        <div>
          <div className="h-24 flex border border-black" style={{background: this.state.value }}>

            <div className="flex-1 flex justify-center items-center">
              <input
                value={this.state.value}
                className="text-center border border-black"
                placeholder="color code"
                onChange={this.handleInputChange}
              />
            </div>

            <ColorInfo
              name={name}
              r={r}
              g={g}
              b={b}
            />

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  count: state.count,
})

const mapDispatchToProps = {
  increment,
  decrement,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
