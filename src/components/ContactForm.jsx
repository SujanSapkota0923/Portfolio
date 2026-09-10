import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { profile } from '../data/portfolio'

const schema=z.object({name:z.string().trim().min(2,'Please enter your name.'),email:z.string().email('Enter a valid email address.'),subject:z.string().trim().min(3,'Tell me what this is about.'),message:z.string().trim().min(20,'Please share at least 20 characters.')})
const fields=[['name','Name','Your name'],['email','Email','you@company.com'],['subject','Subject','A cloud or network project']]
// The site is fully static, so there is no endpoint to post to: the form validates
// here and then hands the composed message to the visitor's own mail client.
const mailtoHref=({name,email,subject,message})=>`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n—\n${name}\n${email}`)}`
export default function ContactForm(){ const [status,setStatus]=useState('idle'); const {register,handleSubmit,reset,formState:{errors}}=useForm({resolver:zodResolver(schema)}); const submit=data=>{window.location.href=mailtoHref(data);setStatus('sent');reset()}
return <form onSubmit={handleSubmit(submit)} noValidate className="space-y-6">{fields.map(([name,label,placeholder])=><label key={name} className="block"><span className="eyebrow">{label}</span><input {...register(name)} type={name==='email'?'email':'text'} placeholder={placeholder} className="mt-2 min-h-14 w-full border-b border-line bg-transparent px-0 text-lg placeholder:text-muted/50 focus:border-accent focus:ring-0" aria-invalid={!!errors[name]}/>{errors[name]&&<span className="mt-2 block text-sm text-red-600" role="alert">{errors[name].message}</span>}</label>)}<label className="block"><span className="eyebrow">Message</span><textarea {...register('message')} rows="5" placeholder="What are you running, and where could I help?" className="mt-2 w-full resize-y border-b border-line bg-transparent px-0 py-4 text-lg placeholder:text-muted/50 focus:border-accent focus:ring-0" aria-invalid={!!errors.message}/>{errors.message&&<span className="mt-2 block text-sm text-red-600" role="alert">{errors.message.message}</span>}</label><button className="button w-full sm:w-auto" data-cursor="send">Send enquiry <ArrowRight size={16}/></button><div aria-live="polite">{status==='sent'&&<p className="flex items-start gap-2 text-sm text-green-700"><CheckCircle2 className="mt-0.5 shrink-0" size={17}/> <span>Your email client should be opening with the message ready to send. If it didn’t, write to <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a> directly.</span></p>}</div></form> }
