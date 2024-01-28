import { pickNumber } from "./pick-number"

export function pickFrom(n: number, input: number[]) {
  const arr = [...input]
  for (let i = 0; i < n; ++i) {
    const j = pickNumber(arr.length - i) - 1
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }

  return arr.slice(0, n)
}
