import React from 'react'
import { formatOversFromBalls } from '../utils/helpers'

export default function BowlerCard({ bowler, isActive }) {
  const oversText = formatOversFromBalls(bowler.overs)
  const econ = bowler.overs === 0 ? '0.00' : (bowler.runs / (bowler.overs / 6)).toFixed(2)
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <div className={`text-sm ${isActive ? 'font-bold' : ''}`}>{bowler.name}{isActive ? ' *' : ''}</div>
        <div className="text-xs text-gray-500">Status: {bowler.status}</div>
      </div>
      <div className="text-sm text-right">
        <div>{oversText} overs</div>
        <div className="text-xs text-gray-600">
          Runs: {bowler.runs} • W: {bowler.wickets} • EX: {bowler.extras} • Econ: {econ}
        </div>
      </div>
    </div>
  )
}
