import { pickNumber } from "./pick-number"

export function pickFrom(n: number, input: number[]) {
  n = Math.min(n, input.length)
  const arr = [...input]
  for (let i = 0; i < n; ++i) {
    const j = pickNumber(arr.length - i) - 1
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }

  return arr.slice(0, n)
}

export function pickFromRange(n: number, low: number, high: number) {
  const arr: number[] = []
  for (let i = low; i <= high; ++i) {
    arr.push(i)
  }

  return pickFrom(n, arr)
}
