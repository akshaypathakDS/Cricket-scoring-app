export function formatOvers(totalBalls) { return `${Math.floor(totalBalls/6)}.${totalBalls%6}`; }
export function sr(runs, balls) { return balls===0 ? "0.00" : ((runs/balls)*100).toFixed(2); }