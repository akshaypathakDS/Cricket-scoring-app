import React from 'react'

export default function BowlerSelect({ bowlers, lastBowlerId, activeBowlerId, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Select Bowler for Over</label>
      <select
        className="border rounded p-2"
        value={activeBowlerId || ''}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="">-- Choose bowler --</option>
        {bowlers.map((b) => (
          <option
            key={b.id}
            value={b.id}
            disabled={b.id === lastBowlerId}
          >
            {b.name}{b.id === lastBowlerId ? ' (bowled last over)' : ''}
          </option>
        ))}
      </select>
    </div>
  )
}
