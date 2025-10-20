// import React, { useState } from 'react'

// export default function MatchSetup({ onStart }) {
//   const [teamAName, setTeamAName] = useState('Team A')
//   const [teamBName, setTeamBName] = useState('Team B')
//   const [teamAPlayers, setTeamAPlayers] = useState([''])
//   const [teamBPlayers, setTeamBPlayers] = useState([''])
//   const [numOvers, setNumOvers] = useState(5)

//   const handleStart = () => {
//     const players = teamAPlayers.map((name, i) => ({
//       id: i + 1,
//       name: name || `Player ${i + 1}`,
//       runs: 0,
//       balls: 0,
//       fours: 0,
//       sixes: 0,
//       status: i < 2 ? 'batting' : 'yet',
//     }))

//     const bowlers = teamBPlayers.map((name, i) => ({
//       id: i + 1,
//       name: name || `Player ${i + 1}`,
//       overs: 0,
//       runs: 0,
//       wickets: 0,
//       extras: 0,
//       status: 'available',
//     }))

//     onStart({
//       teamAName,
//       teamBName,
//       players,
//       bowlers,
//       numOvers,
//       strikerId: 1,
//       nonStrikerId: 2,
//       activeBowlerId: null,
//       lastBowlerId: null,
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
//         <h2 className="text-xl font-bold mb-4">Match Setup</h2>

//         <label className="block mb-2">Team A Name</label>
//         <input
//           className="border rounded w-full p-2 mb-3"
//           value={teamAName}
//           onChange={(e) => setTeamAName(e.target.value)}
//         />

//         <label className="block mb-2">Team A Players (comma separated)</label>
//         <input
//           className="border rounded w-full p-2 mb-3"
//           value={teamAPlayers.join(', ')}
//           onChange={(e) => setTeamAPlayers(e.target.value.split(',').map((p) => p.trim()))}
//         />

//         <label className="block mb-2">Team B Name</label>
//         <input
//           className="border rounded w-full p-2 mb-3"
//           value={teamBName}
//           onChange={(e) => setTeamBName(e.target.value)}
//         />

//         <label className="block mb-2">Team B Players (comma separated) - these will be bowlers</label>
//         <input
//           className="border rounded w-full p-2 mb-3"
//           value={teamBPlayers.join(', ')}
//           onChange={(e) => setTeamBPlayers(e.target.value.split(',').map((p) => p.trim()))}
//         />

//         <label className="block mb-2">Number of Overs</label>
//         <input
//           className="border rounded w-full p-2 mb-4"
//           type="number"
//           value={numOvers}
//           onChange={(e) => setNumOvers(Number(e.target.value))}
//         />

//         <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={handleStart}>
//           Start Match
//         </button>
//       </div>
//     </div>
//   )
// }
// // import React, { useState } from 'react';
// // import { Users, Plus, X, ChevronRight } from 'lucide-react';

// // export default function TeamSetup({ onComplete }) {
// //   const [teamAPlayers, setTeamAPlayers] = useState([]);
// //   const [teamBPlayers, setTeamBPlayers] = useState([]);
// //   const [playerInput, setPlayerInput] = useState('');
// //   const [currentTeam, setCurrentTeam] = useState('A');
// //   const [battingFirst, setBattingFirst] = useState('A');
// //   const [totalOvers, setTotalOvers] = useState(20);

// //   const addPlayer = () => {
// //     if (!playerInput.trim()) return;
// //     if (currentTeam === 'A' && teamAPlayers.length < 11) {
// //       setTeamAPlayers([...teamAPlayers, playerInput.trim()]);
// //     } else if (currentTeam === 'B' && teamBPlayers.length < 11) {
// //       setTeamBPlayers([...teamBPlayers, playerInput.trim()]);
// //     }
// //     setPlayerInput('');
// //   };

// //   const removePlayer = (team, index) => {
// //     if (team === 'A') setTeamAPlayers(teamAPlayers.filter((_, i) => i !== index));
// //     else setTeamBPlayers(teamBPlayers.filter((_, i) => i !== index));
// //   };

// //   const canStart = teamAPlayers.length >= 2 && teamBPlayers.length >= 2;

// //   return (
// //     <div style={{
// //       minHeight: '100vh',
// //       background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
// //       padding: '24px'
// //     }}>
// //       <div style={{
// //         maxWidth: '1000px',
// //         margin: '0 auto',
// //         background: 'white',
// //         borderRadius: '16px',
// //         boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
// //         padding: '32px'
// //       }}>
// //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
// //           <Users size={32} color="#059669" />
// //           <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Match Setup</h1>
// //         </div>

// //         {/* Total Overs */}
// //         <div style={{ marginBottom: '24px' }}>
// //           <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Total Overs Per Innings</label>
// //           <input type="number"
// //             value={totalOvers}
// //             onChange={e => setTotalOvers(Math.max(1, parseInt(e.target.value) || 20))}
// //             min="1"
// //             style={{ width: '100%', padding: '12px 16px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
// //         </div>

// //         {/* Team Toggle */}
// //         <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
// //           <button onClick={() => setCurrentTeam('A')} style={{
// //             flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none',
// //             cursor: 'pointer', background: currentTeam === 'A' ? '#2563eb' : '#e5e7eb',
// //             color: currentTeam === 'A' ? 'white' : '#374151', fontSize: '16px'
// //           }}>Team A ({teamAPlayers.length}/11)</button>
// //           <button onClick={() => setCurrentTeam('B')} style={{
// //             flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none',
// //             cursor: 'pointer', background: currentTeam === 'B' ? '#dc2626' : '#e5e7eb',
// //             color: currentTeam === 'B' ? 'white' : '#374151', fontSize: '16px'
// //           }}>Team B ({teamBPlayers.length}/11)</button>
// //         </div>

// //         {/* Player Input */}
// //         <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
// //           <input type="text"
// //             value={playerInput}
// //             onChange={e => setPlayerInput(e.target.value)}
// //             onKeyPress={e => e.key === 'Enter' && addPlayer()}
// //             placeholder={`Enter player name for Team ${currentTeam}`}
// //             style={{ flex: 1, padding: '12px 16px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
// //           <button onClick={addPlayer} disabled={(currentTeam === 'A' && teamAPlayers.length >= 11) || (currentTeam === 'B' && teamBPlayers.length >= 11)}
// //             style={{ padding: '12px 24px', background: '#059669', color: 'white', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', opacity: (currentTeam === 'A' && teamAPlayers.length >= 11) || (currentTeam === 'B' && teamBPlayers.length >= 11) ? 0.5 : 1 }}>
// //             <Plus size={20} />
// //           </button>
// //         </div>

// //         {/* Player Lists */}
// //         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
// //           <div style={{ background: '#dbeafe', borderRadius: '8px', padding: '16px' }}>
// //             <h3 style={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '12px', fontSize: '18px' }}>Team A Lineup</h3>
// //             <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// //               {teamAPlayers.map((player, idx) => (
// //                 <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '8px 12px', borderRadius: '6px', marginBottom: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
// //                   <span style={{ fontSize: '14px' }}>{idx + 1}. {player}</span>
// //                   <button onClick={() => removePlayer('A', idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><X size={16} /></button>
// //                 </li>
// //               ))}
// //             </ol>
// //           </div>
// //           <div style={{ background: '#fee2e2', borderRadius: '8px', padding: '16px' }}>
// //             <h3 style={{ fontWeight: 'bold', color: '#991b1b', marginBottom: '12px', fontSize: '18px' }}>Team B Lineup</h3>
// //             <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// //               {teamBPlayers.map((player, idx) => (
// //                 <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '8px 12px', borderRadius: '6px', marginBottom: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
// //                   <span style={{ fontSize: '14px' }}>{idx + 1}. {player}</span>
// //                   <button onClick={() => removePlayer('B', idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><X size={16} /></button>
// //                 </li>
// //               ))}
// //             </ol>
// //           </div>
// //         </div>

// //         {/* Batting First */}
// //         <div style={{ marginBottom: '24px' }}>
// //           <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Team Batting First</label>
// //           <div style={{ display: 'flex', gap: '8px' }}>
// //             <button onClick={() => setBattingFirst('A')} style={{ flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', background: battingFirst === 'A' ? '#2563eb' : '#e5e7eb', color: battingFirst === 'A' ? 'white' : '#374151', fontSize: '16px' }}>Team A</button>
// //             <button onClick={() => setBattingFirst('B')} style={{ flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', background: battingFirst === 'B' ? '#dc2626' : '#e5e7eb', color: battingFirst === 'B' ? 'white' : '#374151', fontSize: '16px' }}>Team B</button>
// //           </div>
// //         </div>

// //         <button onClick={() => canStart && onComplete({ teamAPlayers, teamBPlayers, battingFirst, totalOvers })} disabled={!canStart}
// //           style={{ width: '100%', padding: '16px', background: canStart ? '#059669' : '#9ca3af', color: 'white', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', border: 'none', cursor: canStart ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
// //           Start Match <ChevronRight size={24} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

import React, { useState } from 'react'

export default function MatchSetup({ onStart }) {
  const [teamAName, setTeamAName] = useState('Team A')
  const [teamBName, setTeamBName] = useState('Team B')
  const [teamAPlayers, setTeamAPlayers] = useState([''])
  const [teamBPlayers, setTeamBPlayers] = useState([''])
  const [numOvers, setNumOvers] = useState(5)
  const [battingFirst, setBattingFirst] = useState('A') // 'A' or 'B'

  const handleStart = () => {
    const players = teamAPlayers.map((name, i) => ({
      id: i + 1,
      name: name || `Player ${i + 1}`,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      status: i < 2 && battingFirst === 'A' ? 'batting' : 'yet',
    }))

    const bowlers = teamBPlayers.map((name, i) => ({
      id: i + 1,
      name: name || `Player ${i + 1}`,
      overs: 0,
      runs: 0,
      wickets: 0,
      extras: 0,
      status: 'available',
    }))

    // If Team B is batting first, swap roles
    const firstBattingTeam = battingFirst === 'A' ? { players, bowlers } : { players: bowlers, bowlers: players }

    onStart({
      teamAName,
      teamBName,
      players: firstBattingTeam.players,
      bowlers: firstBattingTeam.bowlers,
      numOvers,
      strikerId: 1,
      nonStrikerId: 2,
      activeBowlerId: null,
      lastBowlerId: null,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Match Setup</h2>

        {/* Batting first toggle */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Which team will bat first?</p>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded ${battingFirst === 'A' ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setBattingFirst('A')}
            >
              {teamAName || 'Team A'}
            </button>
            <button
              className={`px-4 py-2 rounded ${battingFirst === 'B' ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setBattingFirst('B')}
            >
              {teamBName || 'Team B'}
            </button>
          </div>
        </div>

        <label className="block mb-2">Team A Name</label>
        <input
          className="border rounded w-full p-2 mb-3"
          value={teamAName}
          onChange={(e) => setTeamAName(e.target.value)}
        />

        <label className="block mb-2">Team A Players (comma separated)</label>
        <input
          className="border rounded w-full p-2 mb-3"
          value={teamAPlayers.join(', ')}
          onChange={(e) => setTeamAPlayers(e.target.value.split(',').map((p) => p.trim()))}
        />

        <label className="block mb-2">Team B Name</label>
        <input
          className="border rounded w-full p-2 mb-3"
          value={teamBName}
          onChange={(e) => setTeamBName(e.target.value)}
        />

        <label className="block mb-2">Team B Players (comma separated) - these will be bowlers</label>
        <input
          className="border rounded w-full p-2 mb-3"
          value={teamBPlayers.join(', ')}
          onChange={(e) => setTeamBPlayers(e.target.value.split(',').map((p) => p.trim()))}
        />

        <label className="block mb-2">Number of Overs</label>
        <input
          className="border rounded w-full p-2 mb-4"
          type="number"
          value={numOvers}
          onChange={(e) => setNumOvers(Number(e.target.value))}
        />

        <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={handleStart}>
          Start Match
        </button>
      </div>
    </div>
  )
}
