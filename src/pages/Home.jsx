import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronsDown, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import DotField from '../components/DotField'
import PageMeta from '../components/PageMeta'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { featuredProjects, profile } from '../data/portfolio'

const heroFade = (delay=0) => ({ initial:{opacity:0,y:20}, animate:{opacity:1,y:0}, transition:{duration:.6,delay,ease:[.25,.46,.45,.94]} })

export default function Home(){
  const projects=featuredProjects
  const heroRef=useRef(null)
  const reduced=useReducedMotion()
  const {scrollYProgress}=useScroll({target:heroRef,offset:['start start','end start']})
  const headlineY=useTransform(scrollYProgress,[0,1],[0,reduced?0:-140])
  const headlineOpacity=useTransform(scrollYProgress,[0,.85],[1,0])
  const fieldScale=useTransform(scrollYProgress,[0,1],[1,reduced?1:1.15])
  const [titleLine1,...titleRest]=profile.title.split(' ')
  const titleLine2=titleRest.join(' ')
  return <><PageMeta title="Infrastructure Engineer" description={profile.tagline}/>
  <section ref={heroRef} className="relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden bg-paper px-5 py-20 text-center text-ink sm:px-8">
    <motion.div style={{scale:fieldScale}} className="pointer-events-none absolute inset-0 grid place-items-center opacity-[.16]"><DotField className="h-[90vmin] w-[90vmin] max-w-none"/></motion.div>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(var(--paper))_72%)]"/>
    <motion.div {...heroFade(0)} className="relative border border-ink/25 bg-ink px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[.25em] text-paper">{profile.name}</motion.div>
    <motion.div style={{y:headlineY,opacity:headlineOpacity}} className="relative mt-8">
      <motion.h1 {...heroFade(.15)} className="display uppercase leading-[.85]">{titleLine1}<br/>{titleLine2}</motion.h1>
    </motion.div>
    <motion.p {...heroFade(.3)} className="relative mt-9 max-w-xl font-mono text-[11px] uppercase leading-6 tracking-[.18em] text-muted sm:text-xs">{profile.tagline}</motion.p>
    <motion.div {...heroFade(.4)} className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
      <Link data-cursor="let's see" className="button" to="/projects">View work <ArrowRight size={16}/></Link>
      <Link data-cursor="yay" className="button button-ghost" to="/contact">Start a conversation</Link>
    </motion.div>
    <motion.div {...heroFade(.55)} className="relative mt-16 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-muted">
      <span>Scroll to initiate</span>
      <ChevronsDown className="animate-bounce" size={16}/>
    </motion.div>
  </section>
  <section className="border-y border-line bg-ink text-paper"><div className="shell flex flex-wrap items-center justify-between gap-6 py-6"><span className="eyebrow !text-paper/60">Core practice</span><div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest"><span>Linux / Windows</span><span>AWS / Terraform</span><span>Docker / Kubernetes</span><span>Network security</span></div></div></section>
  <section className="shell py-24 sm:py-36"><div className="mb-14 flex items-end justify-between border-b border-line pb-7"><div><span className="eyebrow">Selected work</span><h2 className="section-title mt-4">Built to stay running.</h2></div><Link to="/projects" data-cursor="more" className="eyebrow hidden items-center gap-2 hover:text-accent sm:flex">All projects <ArrowRight size={14}/></Link></div><div className="grid gap-5 md:grid-cols-2">{projects.slice(0,4).map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></section>
  <section className="shell"><Reveal className="grid gap-8 border-y border-line py-16 md:grid-cols-[.65fr_1.35fr]"><span className="eyebrow">How I work</span><div><p className="font-display text-3xl leading-tight sm:text-5xl">Reproducible infrastructure. Least privilege. Systems you can observe.</p><p className="prose-copy mt-8">I work from the network up: map what is actually running, put it in Terraform so the next person inherits a record rather than a rumour, close the paths nothing needs open, then wire up the logs and alerts that say something is wrong before a user has to.</p><Link to="/about" data-cursor="who" className="button button-ghost mt-8">More about me <ArrowRight size={16}/></Link>{profile.resume&&<a href={profile.resume} data-cursor="grab it" className="button button-ghost ml-3 mt-8"><Download size={16}/> Resume</a>}</div></Reveal></section></> }
