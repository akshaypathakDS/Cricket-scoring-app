import React, { useState } from 'react'

export default function ExtrasModal({ onClose, onWide, onNoBall }) {
  const [wideExtra, setWideExtra] = useState(0)
  const [noBallRuns, setNoBallRuns] = useState(0)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Extras</h3>
        <div className="space-y-4">
          <div>
            <div className="font-medium">Wide</div>
            <div className="text-sm text-gray-600">Adds +1 run, not a legal ball</div>
            <div className="mt-2 flex gap-2">
              <input type="number" className="border px-2 py-1 rounded w-28" value={wideExtra} onChange={(e) => setWideExtra(Number(e.target.value))} />
              <button className="px-3 py-1 bg-sky-500 text-white rounded" onClick={() => onWide(wideExtra)}>Add Wide</button>
            </div>
          </div>

          <div>
            <div className="font-medium">No Ball</div>
            <div className="text-sm text-gray-600">Adds +1 run and any runs scored</div>
            <div className="mt-2 flex gap-2">
              <input type="number" className="border px-2 py-1 rounded w-28" value={noBallRuns} onChange={(e) => setNoBallRuns(Number(e.target.value))} />
              <button className="px-3 py-1 bg-yellow-400 text-black rounded" onClick={() => onNoBall(noBallRuns)}>Add No Ball</button>
            </div>
          </div>

          <button className="mt-2 px-3 py-1 border rounded" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
