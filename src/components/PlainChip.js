import React from 'react'
import { toHex } from '../util'

const PlainChip = (props) => {
  let background
  const { r, g, b } = props.color || {}
  try {
    background = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  } catch (error) {
    // console.log(error)
  }
  return (
    <div
      className="border border-black mb-4 inline-block w-48 h-48" style={{background}}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

export default PlainChip
