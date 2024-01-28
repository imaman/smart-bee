export function pickNumber(n: number) {
  return Math.min(n, Math.trunc(Math.random() * n) + 1)
}

