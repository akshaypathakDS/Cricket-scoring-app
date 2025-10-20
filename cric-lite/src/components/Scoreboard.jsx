import React, { useState } from 'react'
import useCricketLogic from '../hooks/useCricketLogic'
import { formatOvers, sr } from '../utils/helpers'
import Badge from './Badge'
import ExtrasModal from './ExtrasModal'
import OutModal from './OutModal'
import AddPlayersModal from './AddPlayersModal'
import BowlerSelect from './BowlerSelect'
import BowlerCard from './BowlerCard'

export default function Scoreboard({ matchData, onReset }) {
  const logic = useCricketLogic(matchData)

  const {
    totalRuns,
    wickets,
    legalBalls,
    players,
    strikerId,
    nonStrikerId,
    currentOverDeliveries,
    lastBalls,
    currentOverBallCount,
    yetToBat,
    extrasModalOpen,
    outModalOpen,
    openExtras,
    openOutModal,
    handleRuns,
    handleCustomRunEnter,
    handleDismissal,
    handleWide,
    handleNoBall,
    swapStrike,
    setExtrasModalOpen,
    setOutModalOpen,
    bowlers,
    activeBowlerId,
    lastBowlerId,
    addPlayers,
    selectBowler,
  } = logic

  const { teamAName, teamBName, numOvers } = matchData
  const [showAddModal, setShowAddModal] = useState(false)
  const sortedBowlers = [...bowlers].sort((a, b) => b.overs - a.overs)


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 relative">
        <header className="flex items-center justify-between mb-6">
          <div>
            <button onClick={() => setShowAddModal(true)} className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">➕ Add Players</button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-700">{teamAName} vs {teamBName}</h1>
            <div className="text-sm text-gray-500">Overs: {numOvers}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold">{totalRuns}/{wickets}</div>
            <div className="text-sm text-gray-600">
              Overs: {formatOvers(legalBalls)} ({legalBalls} balls)
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
            <div className="mb-2 font-semibold">Scoring Controls</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {[0,1,2,3,4,5,6].map(n => (
                <button key={n} className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-slate-50" onClick={() => handleRuns(n)} disabled={!activeBowlerId} className={!activeBowlerId ? 'opacity-50 cursor-not-allowed px-3 py-2 bg-white border rounded shadow-sm' : 'px-3 py-2 bg-white border rounded shadow-sm hover:bg-slate-50'}>{n}</button>
              ))}
              <button className="px-3 py-2 border rounded" onClick={openExtras} disabled={!activeBowlerId} className={!activeBowlerId ? 'opacity-50 cursor-not-allowed px-3 py-2 border rounded' : 'px-3 py-2 border rounded'}>Extras</button>
              <button className="px-3 py-2 border rounded" onClick={openOutModal} disabled={!activeBowlerId} className={!activeBowlerId ? 'opacity-50 cursor-not-allowed px-3 py-2 border rounded' : 'px-3 py-2 border rounded'}>Out</button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <input placeholder="Custom runs (Enter)" className="px-2 py-1 border rounded w-40" onKeyDown={(e) => e.key==='Enter' && handleCustomRunEnter(e.target.value)} />
              <button onClick={swapStrike} className="px-3 py-1 text-sm border rounded">Swap Strike</button>
              <button onClick={onReset} className="px-3 py-1 text-sm border rounded bg-red-50">Reset</button>
            </div>

            <div className="mb-2">
              <BowlerSelect bowlers={bowlers} lastBowlerId={lastBowlerId} activeBowlerId={activeBowlerId} onSelect={selectBowler} />
            </div>

            <div className="mb-2">Active Bowler: <span className="font-medium">{activeBowlerId ? (bowlers.find(b=>b.id===activeBowlerId)?.name) : '-'}</span></div>

            <div className="mb-2">Current Over: <span className="font-medium">{currentOverDeliveries.length > 0 ? currentOverDeliveries.join(' ') : '-'}</span></div>

            <div className="mb-2">Last 12 Balls:
              <div className="flex flex-wrap gap-2 mt-2">
                {lastBalls.length === 0 && <div className="text-sm text-gray-500">No deliveries yet</div>}
                {lastBalls.map((ev,i)=> <Badge key={i} ev={ev} />)}
              </div>
            </div>

            <div>Current Over Balls: {currentOverBallCount}/6</div>
          </div>

          <aside className="bg-white p-4 rounded-md border">
            <h3 className="font-semibold mb-2">Bowler Scorecard ({teamBName})</h3>
            <div className="max-h-64 overflow-y-auto overflow-x-hidden pr-2">
              {bowlers.length === 0 && <div className="text-sm text-gray-500">No bowlers yet</div>}
              {sortedBowlers.map((b) => (
          <BowlerCard
            key={b.id}
            bowler={b}
            isActive={b.id === activeBowlerId}
          />
        ))}
            </div>
          </aside>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 bg-white p-4 rounded-md border">
            <h2 className="font-semibold mb-3">Batsmen & Scorecard</h2>
            <div className="space-y-3">
              {players.map(p => (
                <div key={p.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <span className={`${p.id===strikerId ? 'font-bold' : ''}`}>{p.name}{p.id===strikerId && ' *'}{p.id===nonStrikerId && ' (NS)'}</span>
                    {p.status === 'retired' && <sub className="ml-1 text-xs text-gray-500">RT</sub>}
                    <div className="text-xs text-gray-500">{p.status}</div>
                  </div>
                  <div className="text-sm text-right">
                    <div>{p.runs} ({p.balls})</div>
                    <div className="text-xs text-gray-600">4s: {p.fours} • 6s: {p.sixes} • SR: {sr(p.runs,p.balls)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white p-4 rounded-md border">
            <h3 className="font-semibold mb-2">Yet to Bat</h3>
            <div className="text-sm text-gray-700">{yetToBat.join(', ') || '-'}</div>
          </aside>
        </section>
      </div>

      {showAddModal && <AddPlayersModal onClose={() => setShowAddModal(false)} onAddPlayers={addPlayers} />}

      {extrasModalOpen && <ExtrasModal onClose={() => setExtrasModalOpen(false)} onWide={handleWide} onNoBall={handleNoBall} />}

      {outModalOpen && <OutModal players={players} strikerId={strikerId} onClose={() => setOutModalOpen(false)} onSubmit={handleDismissal} />}
    </div>
  )
}
