import namedColors from 'color-name-list'

export const addHex = (a, b) => {
  const result = {
    r: a.r + b.r,
    g: a.g + b.g,
    b: a.b + b.b,
  }
  let scale = 1
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (value > 255) {
      scale = Math.min(scale, 255 / value)
    }
  })
  Object.keys(result).forEach(key => {
    result[key] *= scale
  })
  return result
}

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

export const toHex = (x) => {
  return padLeft(2, Math.round(x).toString(16))
}

export const getRGB = (value) => {
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
