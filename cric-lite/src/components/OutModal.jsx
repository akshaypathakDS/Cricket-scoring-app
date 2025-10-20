import React, { useState } from 'react'

export default function OutModal({ players, strikerId, onClose, onSubmit }) {
  const yetToBatPlayers = players.filter((p) => p.status === 'yet')
  const [replacementId, setReplacementId] = useState(yetToBatPlayers[0]?.id || '')
  const [dismissalType, setDismissalType] = useState('bowled')

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Dismissal</h3>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Select Dismissal</label>
          <select value={dismissalType} onChange={(e) => setDismissalType(e.target.value)} className="w-full border px-2 py-1 rounded">
            <option value="bowled">Bowled</option>
            <option value="caught_and_bowled">Caught &amp; Bowled</option>
            <option value="runout_nb">Run out (NO BALL)</option>
            <option value="runout">Run out</option>
            <option value="caught">Caught</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Replacement (Next Batsman)</label>
          <select value={replacementId || ''} onChange={(e) => setReplacementId(Number(e.target.value) || '')} className="w-full border px-2 py-1 rounded">
            <option value=''>-- No replacement selected --</option>
            {yetToBatPlayers.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 border rounded" onClick={onClose}>Cancel</button>
          <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => onSubmit({ replacementId, dismissalType })}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
