export function formatOvers(totalBalls) {
  const overs = Math.floor(totalBalls / 6)
  const balls = totalBalls % 6
  return `${overs}.${balls}`
}

export function sr(runs, balls) {
  if (balls === 0) return '0.00'
  return ((runs / balls) * 100).toFixed(2)
}

export function formatOversFromBalls(totalBalls) {
  const overs = Math.floor(totalBalls / 6)
  const balls = totalBalls % 6
  return `${overs}.${balls}`
}
