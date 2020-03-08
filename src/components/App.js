import React, { Component } from 'react'
import ColorInfo from './ColorInfo'
import namedColors from 'color-name-list'

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
  let result
  let name = ''
  if (isRGB(value)) {
    result = parseRGB(value)
  } else if (isHex(value)) {
    result = parseHex(value)
  } else {
    name = value
  }

  let foundColor

  const lowerValue = value.toLowerCase()
  if (result && !name) {
    const hex = `#${result.r.toString(16)}${result.g.toString(16)}${result.b.toString(16)}`
    foundColor = namedColors.find(color => color.hex === hex)
    if (foundColor) {
      name = foundColor.name
    }
  } else {
    foundColor = namedColors.find(color => color.name.toLowerCase() === lowerValue)
    if (foundColor) {
      result = parseHex(foundColor.hex)
    }
  }
  result = result || {}
  return {
    r: result.r,
    g: result.g,
    b: result.b,
    name,
  }
}

class App extends Component {
  state = {
    value: '#c80f0a',
  }

  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { r, g, b, name } = getRGB(this.state.value)

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

export default App
