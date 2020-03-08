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

const padLeft = (length, value) => {
  while (value.length < length) {
    value = `0${value}`
  }
  return value
}

const toHex = (x) => {
  return padLeft(2, x.toString(16))
}

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
    const hex = `#${toHex(result.r)}${toHex(result.g)}${toHex(result.b)}`
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


class Color extends Component {
  state = {
    value: '',
  }

  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
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
      <div className="h-24 flex border border-black mb-4" style={{background: hex }}>

        <div className="flex-1 flex justify-center items-center">
          <input
            value={this.state.value}
            className="text-center border border-black"
            placeholder="put color code here"
            onChange={this.handleInputChange}
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
