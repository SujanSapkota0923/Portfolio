import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
export default function NotFound(){return <div className="shell grid min-h-[70vh] place-items-center py-20 text-center"><PageMeta title="Page not found" description="The requested page does not exist."/><div><span className="font-display text-[clamp(8rem,30vw,22rem)] font-semibold leading-none text-accent">404</span><h1 className="section-title -mt-4">Wrong turn.</h1><p className="mt-5 text-muted">This route doesn’t lead anywhere—yet.</p><Link className="button mt-8" to="/"><ArrowLeft size={16}/> Back home</Link></div></div>}
