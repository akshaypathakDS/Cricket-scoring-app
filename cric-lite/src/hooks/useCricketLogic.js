import { useState } from 'react'

export default function useCricketLogic(init) {
  const [players, setPlayers] = useState(init.players)
  const [battingOrder, setBattingOrder] = useState(init.players.map(p => p.id))
  const [strikerId, setStrikerId] = useState(init.strikerId)
  const [nonStrikerId, setNonStrikerId] = useState(init.nonStrikerId)
  const [totalRuns, setTotalRuns] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [legalBalls, setLegalBalls] = useState(0)
  const [currentOverDeliveries, setCurrentOverDeliveries] = useState([])
  const [lastBalls, setLastBalls] = useState([])
  const [currentOverBallCount, setCurrentOverBallCount] = useState(0)

  const [bowlers, setBowlers] = useState(init.bowlers || [])
  const [activeBowlerId, setActiveBowlerId] = useState(init.activeBowlerId || null)
  const [lastBowlerId, setLastBowlerId] = useState(init.lastBowlerId || null)

  const [extrasModalOpen, setExtrasModalOpen] = useState(false)
  const [outModalOpen, setOutModalOpen] = useState(false)

  const updatePlayer = (id, updates) =>
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))

  const updateBowlerByFunc = (id, fn) =>
    setBowlers(prev => prev.map(b => b.id === id ? fn(b) : b))

  const recordEvent = (eventLabel) => {
    setCurrentOverDeliveries(prev => [...prev, eventLabel])
    setLastBalls(prev => {
      const next = [...prev, eventLabel]
      if (next.length > 12) next.shift()
      return next
    })
  }

  const swapStrike = () => {
    setStrikerId(s => {
      const temp = s
      setNonStrikerId(temp === nonStrikerId ? s : nonStrikerId)
      return nonStrikerId
    })
  }

  const completeOverIfNeeded = (newLegalBallsCount) => {
    if (newLegalBallsCount % 6 === 0 && newLegalBallsCount > 0) {
      setTimeout(() => {
        setCurrentOverDeliveries([])
        setCurrentOverBallCount(0)
        // swap strike at over end
        setStrikerId(ns => {
          setNonStrikerId(s => s)
          return ns
        })
        // at over end update lastBowler and reset active bowler
        setLastBowlerId(activeBowlerId)
        setActiveBowlerId(null)
      }, 0)
    }
  }

  const handleRuns = (runs, { isExtra = false, extraType = null, extraRuns = 0 } = {}) => {
    if (!activeBowlerId) { alert('Please select a bowler before scoring.'); return }
    if (!strikerId || !nonStrikerId) {
      alert('Please select openers first.')
      return
    }

    if (isExtra) {
      if (extraType === 'wide') {
        setTotalRuns(r => r + 1 + extraRuns)
        if (activeBowlerId) {
          updateBowlerByFunc(activeBowlerId, b => ({ ...b, extras: b.extras + 1 + extraRuns, runs: b.runs + 1 + extraRuns }))
        }
        recordEvent('wd')
      } else if (extraType === 'noball') {
        setTotalRuns(r => r + 1 + extraRuns)
        if (extraRuns > 0) {
          setPlayers(prev => prev.map(p => p.id === strikerId ? {
            ...p,
            runs: p.runs + extraRuns,
            fours: p.fours + (extraRuns === 4 ? 1 : 0),
            sixes: p.sixes + (extraRuns === 6 ? 1 : 0),
          } : p))
          if (activeBowlerId) {
            updateBowlerByFunc(activeBowlerId, b => ({ ...b, runs: b.runs + extraRuns, extras: b.extras + 1 }))
          }
        } else {
          if (activeBowlerId) updateBowlerByFunc(activeBowlerId, b => ({ ...b, extras: b.extras + 1, runs: b.runs + 1 }))
        }
        recordEvent(`nb+${extraRuns}`)
      }
      return
    }

    setTotalRuns(r => r + runs)
    setLegalBalls(b => {
      const newTotal = b + 1
      completeOverIfNeeded(newTotal)
      return newTotal
    })
    setCurrentOverBallCount(c => (c + 1) % 6)

    setPlayers(prev =>
      prev.map(p =>
        p.id === strikerId
          ? {
              ...p,
              runs: p.runs + runs,
              balls: p.balls + 1,
              fours: p.fours + (runs === 4 ? 1 : 0),
              sixes: p.sixes + (runs === 6 ? 1 : 0),
            }
          : p
      )
    )

    // attribute to bowler: increase runs and increment balls for overs
    if (activeBowlerId) {
      updateBowlerByFunc(activeBowlerId, b => ({ ...b, runs: b.runs + runs, overs: b.overs + 1 }))
    }

    recordEvent(String(runs))

    // Strike change for odd runs
    if (runs % 2 === 1) {
      setStrikerId(nonStrikerId)
      setNonStrikerId(strikerId)
    }
  }

  const openExtras = () => setExtrasModalOpen(true)

  const handleWide = (additional = 0) => {
    setTotalRuns(r => r + 1 + additional)
    if (activeBowlerId) {
      updateBowlerByFunc(activeBowlerId, b => ({ ...b, runs: b.runs + 1 + additional, extras: b.extras + 1 + additional }))
    }
    recordEvent('wd')
    setExtrasModalOpen(false)
  }

  const handleNoBall = (extraRuns = 0) => {
    setTotalRuns(r => r + 1 + extraRuns)
    if (extraRuns > 0) {
      setPlayers(prev => prev.map(p => p.id === strikerId ? {
        ...p,
        runs: p.runs + extraRuns,
        fours: p.fours + (extraRuns === 4 ? 1 : 0),
        sixes: p.sixes + (extraRuns === 6 ? 1 : 0),
      } : p))
    }
    if (activeBowlerId) {
      updateBowlerByFunc(activeBowlerId, b => ({ ...b, runs: b.runs + 1 + extraRuns, extras: b.extras + 1 }))
    }
    recordEvent(`nb+${extraRuns}`)
    setExtrasModalOpen(false)
  }

  const openOutModal = () => setOutModalOpen(true)

  const handleDismissal = ({ replacementId, dismissalType }) => {
    const outgoingId = strikerId
    if (!outgoingId) return

    const isNoBallRunout = dismissalType === 'runout_nb'
    const isLegal = !isNoBallRunout && dismissalType !== 'retired' // retired not a wicket

    if (dismissalType === 'retired') {
      updatePlayer(outgoingId, { status: 'retired' })
      recordEvent('RT')
    } else if (isLegal) {
      // legal dismissal: wicket + legal delivery
      updatePlayer(outgoingId, { status: 'out' })
      setWickets(w => w + 1)
      setLegalBalls(b => {
        const newTotal = b + 1
        completeOverIfNeeded(newTotal)
        return newTotal
      })
      setCurrentOverBallCount(c => (c + 1) % 6)
      setPlayers(prev => prev.map(p => p.id === outgoingId ? { ...p, balls: (p.balls || 0) + 1 } : p))
      if (activeBowlerId) updateBowlerByFunc(activeBowlerId, b => ({ ...b, wickets: b.wickets + 1 }))
      recordEvent('W')
    } else {
      // run out on no-ball: wicket but not a legal delivery
      updatePlayer(outgoingId, { status: 'out' })
      setWickets(w => w + 1)
      if (activeBowlerId) updateBowlerByFunc(activeBowlerId, b => ({ ...b, wickets: b.wickets + 1 }))
      recordEvent('W(nb)')
    }

    if (replacementId) {
      updatePlayer(replacementId, { status: 'batting' })
      setStrikerId(replacementId)
    } else setStrikerId(null)

    setOutModalOpen(false)
  }
const handleCustomRunEnter = (val) => {
    const runs = parseInt(val, 10)
    if (isNaN(runs) || runs < 0) return
    handleRuns(runs)
  }

  const resetMatch = () => {
    setPlayers(init.players)
    setBowlers(init.bowlers || [])
    setBattingOrder(init.players.map(p => p.id))
    setStrikerId(init.strikerId)
    setNonStrikerId(init.nonStrikerId)
    setActiveBowlerId(init.activeBowlerId || null)
    setLastBowlerId(init.lastBowlerId || null)
    setTotalRuns(0)
    setWickets(0)
    setLegalBalls(0)
    setCurrentOverDeliveries([])
    setLastBalls([])
    setCurrentOverBallCount(0)
  }

  const yetToBat = players.filter(p => p.status === 'yet').map(p => p.name)

  const addPlayers = (teamAPlayers, teamBPlayers) => {
    if (teamAPlayers.length > 0) {
      setPlayers(prev => {
        const startId = prev.length + 1
        const additions = teamAPlayers.map((name, i) => ({
          id: startId + i,
          name: name || `Player ${startId + i}`,
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          status: 'yet',
        }))
        return [...prev, ...additions]
      })
    }

    if (teamBPlayers.length > 0) {
      setBowlers(prev => {
        const startId = prev.length + 1
        const additions = teamBPlayers.map((name, i) => ({
          id: startId + i,
          name: name || `Player ${startId + i}`,
          overs: 0,
          runs: 0,
          wickets: 0,
          extras: 0,
          status: 'available',
        }))
        return [...prev, ...additions]
      })
    }
    const addedA = teamAPlayers.length
    const addedB = teamBPlayers.length
    alert(`${addedA} added in Team A and ${addedB} added in Team B`)
  }

  const selectBowler = (bowlerId) => {
    if (bowlerId === lastBowlerId) {
      alert('Same bowler cannot bowl two consecutive overs.')
      return
    }
    setActiveBowlerId(bowlerId)
  }

  return {
    players,
    battingOrder,
    strikerId,
    nonStrikerId,
    totalRuns,
    wickets,
    legalBalls,
    currentOverDeliveries,
    lastBalls,
    currentOverBallCount,
    yetToBat,
    extrasModalOpen,
    outModalOpen,
    bowlers,
    activeBowlerId,
    lastBowlerId,
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
    resetMatch,
    addPlayers,
    selectBowler,
  }
}
