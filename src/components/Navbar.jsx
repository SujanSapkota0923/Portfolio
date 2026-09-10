import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'

const links = [['About','/about','who'],['Projects','/projects','peek'],['Contact','/contact','talk']]
export default function Navbar() {
  const [open,setOpen] = useState(false); const { theme,toggleTheme } = useTheme()
  const nextTheme = theme==='dark'?'light':'dark'
  return <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-xl"><nav className="shell flex h-20 items-center justify-between" aria-label="Primary navigation"><Logo />
    <div className="hidden items-center gap-6 md:flex">{links.map(([label,to,word])=><NavLink key={to} to={to} data-cursor={word} className={({isActive})=>`relative pb-1 font-mono text-xs uppercase tracking-[.12em] transition hover:text-ink ${isActive?'text-ink':'text-muted'}`}>{({isActive})=><>{label}{isActive&&<motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-ink" transition={{duration:.3,ease:[.25,.46,.45,.94]}}/>}</>}</NavLink>)}<Link to="/contact" data-cursor="yay" className="button button-ghost !min-h-11 !px-4">Connect</Link><button onClick={toggleTheme} data-cursor={nextTheme} className="grid size-11 place-items-center border border-line" aria-label={`Switch to ${nextTheme} theme`}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button></div>
    <button className="grid size-11 place-items-center border border-line md:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
    {open&&<div className="absolute left-0 top-20 flex w-full flex-col border-b border-line bg-paper p-5 md:hidden">{links.map(([label,to,word])=><NavLink onClick={()=>setOpen(false)} key={to} to={to} data-cursor={word} className={({isActive})=>`flex items-center justify-between border-b border-line py-4 font-display text-3xl transition ${isActive?'text-accent':''}`}>{({isActive})=><>{label}{isActive&&<span className="font-mono text-xs uppercase tracking-[.2em]">Current</span>}</>}</NavLink>)}<button onClick={toggleTheme} data-cursor={nextTheme} className="mt-5 button button-ghost">Toggle {nextTheme} theme</button></div>}</nav></header>
}
