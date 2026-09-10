import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

const COLS = 13
const ROWS = 13

export default function DotField({ className = '' }) {
  const reduced = useReducedMotion()
  const dots = useMemo(() => {
    const cx = (COLS - 1) / 2
    const cy = (ROWS - 1) / 2
    const list = []
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) list.push({ key: `${x}-${y}`, dist: Math.hypot(x - cx, y - cy) })
    return list
  }, [])
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`, maskImage: 'radial-gradient(circle, black 0%, black 38%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 0%, black 38%, transparent 70%)' }}
    >
      {dots.map(({ key, dist }) => (
        <span
          key={key}
          className="m-auto size-[5px] rounded-full bg-ink"
          style={reduced ? { opacity: 0.25 } : { animation: `dot-pulse 3.6s ease-in-out ${dist * 0.1}s infinite` }}
        />
      ))}
    </div>
  )
}
