import { pickFrom } from "./pick-from"

describe('pick-from', () => {
  test('returns n elements from the input array', () => {
    const src = [20, 40, 12, 19, 3]
    const o = pickFrom(3, src)
    expect(o).toHaveLength(3)
    for (const x of o) {
      const index = src.indexOf(x)
      if (index < 0) {
        throw new Error(`not found: ${x}`)
      }

      src.splice(index, 1)
    }
    expect(src).toHaveLength(2)
  })
  test('returns a different result each time', () => {
    const src = [20, 40, 12, 19, 3, 15, 100, 99, 73, 500, 403, 324, 486, 288, 576, 256]

    const set = new Set<string>()
    for (let i = 0; i < 100; ++i) {
      const o = pickFrom(6, src)
      set.add(JSON.stringify(o))
    }
    // we expect at least 80 diiferent results
    expect(set.size).toBeGreaterThan(80)
  })
})

export {}
