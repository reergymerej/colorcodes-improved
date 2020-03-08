import React from 'react'

const withColor = (color) => ({ children }) => (
  <span style={{ color }}>
    { children }
  </span>
)

const Red = withColor('red')
const Green = withColor('green')
const Blue = withColor('blue')

const RGB = ({ r = 0, g = 0, b = 0 }) => (
  <div>
    rgb(
    <Red>
      {r}
    </Red>
    ,&nbsp;
    <Green>
      {g}
    </Green>
    ,&nbsp;
    <Blue>
      {b}
    </Blue>
    )
  </div>
)

const toHexValue = (x) => {
  const hex = x.toString(16)
  if (hex.length === 1) {
    return `0${hex}`
  }
  return hex
}

const shouldShorten = (r, g, b) => r[0] === '0'
  && g[0] === '0'
  && b[0] === '0'

const shortenRGB = (r, g, b) => ({
  r: r[1],
  g: g[1],
  b: b[1],
})

const Hex = ({ r = 0, g = 0, b = 0 }) => {
  r = toHexValue(r)
  g = toHexValue(g)
  b = toHexValue(b)
  if (shouldShorten(r, g, b)) {
    const short = shortenRGB(r, g, b)
    r = short.r
    g = short.g
    b = short.b
  }
  return (
    <div>
      #
      <Red>
        {r}
      </Red>
      <Green>
        {g}
      </Green>
      <Blue>
        {b}
      </Blue>
    </div>
  )
}

const ColorInfo = ({ r = 0, g = 0, b = 0, name = '' }) => (
  <div className="p-3 flex flex-col justify-center bg-black text-white">
    <RGB
      r={r}
      g={g}
      b={b}
    />
    <Hex
      r={r}
      g={g}
      b={b}
    />
    <div>
      {name}
    </div>
  </div>
)

export default ColorInfo
