import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ClipReveal({children,className='',delay=0}){
  const ref=useRef(null)
  const [inView,setInView]=useState(false)
  useEffect(()=>{
    const el=ref.current
    if(!el) return
    const observer=new IntersectionObserver(([entry])=>{ if(entry.isIntersecting){ setInView(true); observer.disconnect() } },{rootMargin:'0px 0px -10% 0px',threshold:0})
    observer.observe(el)
    return ()=>observer.disconnect()
  },[])
  return <motion.div ref={ref} className={className} initial={{clipPath:'inset(100% 0 0 0)',opacity:0}} animate={inView?{clipPath:'inset(0% 0 0 0)',opacity:1}:undefined} transition={{duration:.8,delay,ease:[.215,.61,.355,1]}}>{children}</motion.div>
}
