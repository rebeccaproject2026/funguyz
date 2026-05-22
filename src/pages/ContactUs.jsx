import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Sparkles, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import main7 from '../assets/main7.jpg'

// Floating particle component for the hero section
function HeroParticle({ x, y, size, color, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-10"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`,
        filter: 'blur(1px)'
      }}
      animate={{
        y: [0, -35, 0],
        x: [0, 8, 0],
        opacity: [0.08, 0.45, 0.08],
        scale: [0.9, 1.25, 0.9]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut'
      }}
    />
  )
}


export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after 5s
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-zinc-900 pt-0 pb-0 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FA0C83]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#01CBDF]/[0.02] blur-[150px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <div className="relative w-full bg-[#101012] pt-32 pb-24 md:pt-44 md:pb-32 mb-12 text-center overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={main7}
            alt="Contact Us Background"
            className="w-full h-full object-cover"
            animate={{
              scale: [1.02, 1.10, 1.02],
              x: [5, -5, 5],
              y: [3, -3, 3]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#0b0b0c]/85 z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#0b0b0c_90%)] opacity-55 z-0" />
        </div>

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-10" />
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#FA0C83]/5 to-[#01CBDF]/5 blur-3xl pointer-events-none z-10" />
        
        {/* Floating Particles */}
        <HeroParticle x={80} y={20} size={5} color="#FA0C83" duration={9} delay={0.5} />
        <HeroParticle x={20} y={45} size={4} color="#01CBDF" duration={12} delay={2} />
        <HeroParticle x={65} y={75} size={3} color="#ffffff" duration={8} delay={4} />
        <HeroParticle x={12} y={80} size={6} color="#FA0C83" duration={14} delay={5.5} />
        <HeroParticle x={52} y={15} size={4} color="#01CBDF" duration={10} delay={7} />

        {/* Dynamic watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
          <h1 className="text-[12vw] font-black text-white/[0.015] tracking-tighter uppercase whitespace-nowrap leading-none font-display text-center">
            CONTACT
          </h1>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-20 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase font-display"
            style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)' }}
          >
            Contact Us
          </motion.h1>
          
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-black tracking-widest text-zinc-300 uppercase"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            <Link to="/" className="hover:text-[#FA0C83] transition-colors text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </motion.div>
        </div>

        {/* Bottom Wavy Divider SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] bg-transparent pointer-events-none z-30">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] sm:h-[50px] md:h-[80px]">
            <path d="M0,80 C300,120 600,40 900,110 C1050,130 1150,90 1200,70 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.2" />
            <path d="M0,90 C250,110 550,60 850,115 C1000,130 1100,90 1200,75 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.15" />
            <path d="M0,100 C200,120 500,80 800,110 C950,120 1100,90 1200,80 L1200,120 L0,120 Z" fill="#f4f4f6" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 pb-15">

        {/* 2. FULL-WIDTH GOOGLE MAP WITH CINEMATIC DARK FILTER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-[400px] rounded-[2.5rem] border border-zinc-200 bg-white overflow-hidden relative shadow-md"
        >
          <iframe 
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d166708.2045558193!2d-123.1207!3d49.2827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b8590e3!2sVancouver%2C%20BC%2C%20Canada!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            className="w-full h-full border-0 contrast-[1.05]"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 pointer-events-none border-[12px] border-zinc-100/20 rounded-[2.5rem]" />
        </motion.div>

        {/* 3. TWO-COLUMN LAYOUT BELOW MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Column 1: Send Us Message */}
          <div className="lg:col-span-7">
            <div className="relative pb-3 mb-8 border-b border-zinc-200">
              <h3 className="text-sm font-black tracking-widest text-zinc-800 uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FA0C83]" /> Send Us Message
              </h3>
              <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-zinc-200 shadow-md rounded-3xl p-6 md:p-8 relative"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Your Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#FA0C83] focus:bg-white text-zinc-900 text-xs px-4 py-3.5 rounded-xl outline-none transition-all duration-300 shadow-inner"
                    />
                  </div>
                  
                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#FA0C83] focus:bg-white text-zinc-900 text-xs px-4 py-3.5 rounded-xl outline-none transition-all duration-300 shadow-inner"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Subject</label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#FA0C83] focus:bg-white text-zinc-900 text-xs px-4 py-3.5 rounded-xl outline-none transition-all duration-300 shadow-inner"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Your Message</label>
                  <textarea
                    required
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type details about your inquiry..."
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#FA0C83] focus:bg-white text-zinc-900 text-xs px-4 py-3.5 rounded-xl outline-none transition-all duration-300 resize-none shadow-inner"
                  />
                </div>

                {/* Form Action & Feedback Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-xs font-bold text-[#28a745] flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4" /> Message sent successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl text-white text-xs font-black uppercase tracking-widest cursor-pointer hover:shadow-lg shadow-[#FA0C83]/10 hover:shadow-[#FA0C83]/20 disabled:opacity-50 transition-all duration-300 ml-auto"
                    style={{ background: 'linear-gradient(135deg, #FA0C83, #01CBDF)' }}
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Column 2: Get In Touch & Office details */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Get In Touch */}
            <div className="space-y-6">
              <div className="relative pb-3 border-b border-zinc-200">
                <h3 className="text-sm font-black tracking-widest text-zinc-800 uppercase">
                  Get In Touch
                </h3>
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
              </div>

              <div className="space-y-6">
                {/* Office Info */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#FA0C83] shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Our Office</h4>
                    <p className="text-xs md:text-sm font-bold text-zinc-800 mt-1 leading-snug">
                      2046 Shroom St, Vancouver, BC V6B 1B4, Canada
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#01CBDF] shrink-0 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Telephone</h4>
                    <p className="text-xs md:text-sm font-bold text-zinc-800 mt-1 leading-snug">
                      +1 (576) 245-2470
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#FA0C83] shrink-0 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Email Address</h4>
                    <p className="text-xs md:text-sm font-bold text-zinc-800 mt-1 leading-snug">
                      info@funguyz.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-6">
              <div className="relative pb-3 border-b border-zinc-200">
                <h3 className="text-sm font-black tracking-widest text-zinc-800 uppercase flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#01CBDF]" /> Working Hours
                </h3>
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold py-1 border-b border-zinc-200">
                  <span className="text-zinc-600">Monday - Friday</span>
                  <span className="text-[#01CBDF]">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold py-1 border-b border-zinc-200">
                  <span className="text-zinc-600">Saturday</span>
                  <span className="text-[#01CBDF]">9:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold py-1">
                  <span className="text-zinc-600">Sunday</span>
                  <span className="text-[#FA0C83] uppercase tracking-widest">Closed</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
