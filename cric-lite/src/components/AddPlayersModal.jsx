import React, { useState } from 'react'

export default function AddPlayersModal({ onClose, onAddPlayers }) {
  const [teamAInput, setTeamAInput] = useState("")
  const [teamBInput, setTeamBInput] = useState("")

  const handleSubmit = () => {
    const teamAPlayers = teamAInput
      ? teamAInput.split(",").map((name) => name.trim())
      : []
    const teamBPlayers = teamBInput
      ? teamBInput.split(",").map((name) => name.trim())
      : []
    onAddPlayers(teamAPlayers, teamBPlayers)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add Players</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Team A Players (comma-separated)</label>
          <input
            type="text"
            className="border rounded-lg w-full p-2"
            placeholder="Player 12, Player 13"
            value={teamAInput}
            onChange={(e) => setTeamAInput(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Team B Players (comma-separated)</label>
          <input
            type="text"
            className="border rounded-lg w-full p-2"
            placeholder="Player 12, Player 13"
            value={teamBInput}
            onChange={(e) => setTeamBInput(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-5 gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
