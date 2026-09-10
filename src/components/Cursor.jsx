import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const DEFAULT_SIZE = 34
const WORD_SIZE = 68
const TEXT_SIZE = 46
const INVERT_SELECTOR = '.button:not(.button-ghost), .bg-ink'
const INTERACTIVE_SELECTOR = 'a, button, [role="button"]'
const TEXT_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, li, blockquote, span, label, td, th'

export default function Cursor(){
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const [word, setWord] = useState(null)
  const [textMode, setTextMode] = useState(false)
  const [invert, setInvert] = useState(false)
  const [pressed, setPressed] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 26, stiffness: 850, mass: .18 })
  const ringY = useSpring(y, { damping: 26, stiffness: 850, mass: .18 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('custom-cursor')
    let frame = 0, target = null
    const inspect = () => {
      frame = 0
      const t = target
      if (!(t instanceof Element)) return
      setInvert(!!t.closest(INVERT_SELECTOR))
      const labeled = t.closest('[data-cursor]')
      if (labeled) { setWord(labeled.dataset.cursor); setTextMode(false) }
      else if (t.closest(INTERACTIVE_SELECTOR)) { setWord('click'); setTextMode(false) }
      else if (t.closest(TEXT_SELECTOR)) { setWord(null); setTextMode(true) }
      else { setWord(null); setTextMode(false) }
    }
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      setActive(true)
      target = e.target
      if (!frame) frame = requestAnimationFrame(inspect)
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const leave = () => setActive(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
    }
  }, [reduced, x, y])

  if (reduced || !active) return null
  const size = word ? WORD_SIZE : textMode ? TEXT_SIZE : DEFAULT_SIZE
  const fill = invert ? 'rgb(var(--paper))' : 'rgb(var(--ink))'
  const textColor = invert ? 'rgb(var(--ink))' : 'rgb(var(--paper))'
  return <>
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[999]" style={{ x: ringX, y: ringY }}>
      <motion.div
        className="grid place-items-center overflow-hidden rounded-full text-center"
        animate={{ width: size, height: size, scale: pressed ? .85 : 1, backgroundColor: word ? fill : 'transparent', opacity: word ? .82 : 1, borderWidth: word || textMode ? 0 : 1.5 }}
        transition={{ duration: .25, ease: [.25,.46,.45,.94] }}
        style={{ translateX: '-50%', translateY: '-50%', borderStyle: 'solid', borderColor: fill, backdropFilter: textMode ? 'invert(1)' : 'none', WebkitBackdropFilter: textMode ? 'invert(1)' : 'none' }}
      >
        {word && <span className="px-1.5 font-mono text-[10px] font-semibold uppercase leading-tight tracking-wide" style={{ color: textColor }}>{word}</span>}
      </motion.div>
    </motion.div>
    {!word && !textMode && <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[999]" style={{ x, y }}>
      <div className="-translate-x-1/2 -translate-y-1/2 size-[5px] rounded-full" style={{ backgroundColor: fill }} />
    </motion.div>}
  </>
}
