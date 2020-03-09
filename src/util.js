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
      scale = 255 / value
    }
  })
  Object.keys(result).forEach(key => {
    result[key] *= scale
  })
  return result
}
