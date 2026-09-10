import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
const Home=lazy(()=>import('./pages/Home')); const About=lazy(()=>import('./pages/About')); const Projects=lazy(()=>import('./pages/Projects')); const ProjectDetail=lazy(()=>import('./pages/ProjectDetail')); const Contact=lazy(()=>import('./pages/Contact')); const NotFound=lazy(()=>import('./pages/NotFound'))
function ScrollTop(){ const {pathname}=useLocation(); useEffect(()=>{ window.scrollTo(0,0) },[pathname]); return null }
export default function App(){ return <><Cursor/><a href="#main" className="fixed left-3 top-3 z-[100] -translate-y-20 bg-accent p-3 text-white focus:translate-y-0">Skip to content</a><Navbar/><ScrollTop/><main id="main"><Suspense fallback={<div className="shell grid min-h-[60vh] place-items-center"><span className="eyebrow animate-pulse">Loading dispatch…</span></div>}><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></main><Footer/></> }
