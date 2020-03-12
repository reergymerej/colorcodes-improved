import * as util from './util'

describe('adding hex colors', () => {
  describe('when within bounds', () => {
    it('should return a new hex', () => {
      const a = {
        r: 20,
        g: 100,
        b: 60,
      }
      const b = {
        r: 80,
        g: 120,
        b: 30,
      }
      const result = util.addHex(a, b)
      expect(result).toEqual({
        r: 100,
        g: 220,
        b: 90,
      })
    })
  })

  describe('when outside bounds', () => {
    it('should return a new hex with the same ratios', () => {
      const a = {
        r: 0,
        g: 255,
        b: 100,
      }
      const b = {
        r: 0,
        g: 255,
        b: 0,
      }
      const result = util.addHex(a, b)
      expect(result).toEqual({
        r: 0,
        g: 255,
        b: 50,
      })
    })
  })
})

fdescribe('toHex', () => {
  // {"r":255,"g":30.379061371841154,"b":114.15162454873646}
    // background = `rgb(${r}${g}${b})`

})
