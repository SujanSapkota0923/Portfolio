import { useState } from 'react'
import PageMeta from '../components/PageMeta'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/portfolio'

// The project list is a static import, so the filter options are computed once.
const techs=['All',...new Set(projects.flatMap(p=>p.tech_stack.map(t=>t.name)))]
export default function Projects(){ const [filter,setFilter]=useState('All'); const shown=filter==='All'?projects:projects.filter(p=>p.tech_stack.some(t=>t.name===filter))
return <><PageMeta title="Projects" description="Selected backend, infrastructure, and machine learning project case studies."/><header className="shell py-20 sm:py-32"><span className="eyebrow">Work / Case studies</span><h1 className="display mt-8">Proof is in<br/><span className="text-accent">the product.</span></h1><p className="prose-copy mt-10">Projects built end to end outside of work — a Django social platform backend, a Redis-backed link shortener, and the booking-cancellation model that won the WISE BEE Hackathon.</p></header><section className="shell"><div className="flex gap-2 overflow-x-auto border-y border-line py-4" aria-label="Filter projects by technology">{techs.map(tech=><button key={tech} onClick={()=>setFilter(tech)} aria-pressed={filter===tech} data-cursor="sort" className={`shrink-0 border px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition ${filter===tech?'border-accent bg-accent text-white':'border-line hover:border-ink'}`}>{tech}</button>)}</div><p className="eyebrow my-8" aria-live="polite">{`${shown.length} project${shown.length===1?'':'s'} in view`}</p><div className="grid gap-5 md:grid-cols-2">{shown.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></section></> }
