import { motion } from 'framer-motion'
export default function Reveal({children,className='',delay=0}){ return <motion.div className={className} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,delay,ease:[.25,.46,.45,.94]}}>{children}</motion.div> }
