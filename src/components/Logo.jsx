import { Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Logo() { return <Link to="/" data-cursor="home" className="flex items-center gap-1.5 font-display text-lg font-semibold tracking-[-.05em]" aria-label="Sujan Sapkota home"><Terminal size={18} strokeWidth={2.25}/>SS<span className="text-accent">.</span></Link> }
