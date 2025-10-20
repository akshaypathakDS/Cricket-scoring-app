import React from 'react'

export default function Badge({ ev }) {
  const base = 'flex items-center justify-center rounded-full w-10 h-10 text-sm font-semibold shadow-md'
  if (ev === 'W') return <div className={`${base} bg-red-600 text-white`}>W</div>
  if (ev === 'wd') return <div className={`${base} bg-sky-300 text-black`}>wd</div>
  if (ev.startsWith('nb')) {
    const plus = ev.split('+')[1] || '0'
    return (
      <div className={`${base} bg-yellow-200 text-black flex-col py-1`}>
        <div className="text-xs">nb</div>
        <div className="text-xs">{plus}</div>
      </div>
    )
  }
  return <div className={`${base} bg-white text-black border`}>{ev}</div>
}
