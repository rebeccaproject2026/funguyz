import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Search, Sparkles, MessageSquare, ShieldCheck, Truck, ArrowRight, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import main5 from '../assets/main5.jpg'

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


const SHIPPING_FAQS = [
  {
    id: 1,
    category: 'Shipping & Ordering',
    question: 'Is it safe and discrete to order magic mushrooms online?',
    answer: 'Absolutely. We prioritize your privacy above all else. All products are vacuum-sealed in odor-proof medical-grade bags and shipped in plain, unmarked cardboard boxes. There is no mention of "Funguyz" or magic mushrooms on the outside of the package. We ship via express shipping with tracking numbers so you can monitor your delivery securely.'
  },
  {
    id: 2,
    category: 'Shipping & Ordering',
    question: 'How long does shipping take and what are the rates?',
    answer: 'We offer express delivery across Canada and the US. Standard delivery takes 2–4 business days, while Express shipping takes 1–2 business days. Shipping is FREE for all orders over $99. For orders under $99, standard shipping is a flat rate of $15.'
  },
  {
    id: 7,
    category: 'Shipping & Ordering',
    question: 'What payment methods do you accept?',
    answer: 'We accept secure payments via Credit Cards, Bitcoin (and other major cryptocurrencies), and secure Interac E-Transfers. Detailed instructions for payment processing will be displayed on the checkout screen after placing your order.'
  },
  {
    id: 8,
    category: 'Shipping & Ordering',
    question: 'Are my personal details encrypted and secure?',
    answer: 'Yes, your safety is guaranteed. Our entire website is secured using 256-bit SSL encryption. We never store credit card details on our servers, and all customer data is purged periodically from our database to maintain absolute safety and confidentiality.'
  }
]

const RETURNS_FAQS = [
  {
    id: 9,
    category: 'Returns & Safety',
    question: 'How do I return something to you?',
    answer: 'Due to the nature of our products, we do not accept physical returns. However, if there is any issue with your order (damage, missing items, or quality concerns), please contact our support team and we will issue a full refund or send a replacement immediately.'
  },
  {
    id: 10,
    category: 'Returns & Safety',
    question: 'What is your refund policy if my order is incorrect?',
    answer: 'If you receive an incorrect order or believe your refund amount is incorrect, please email our billing department at info@funguyz.com with your order details. We will resolve it and process the correction within 24 hours.'
  },
  {
    id: 3,
    category: 'Returns & Safety',
    question: 'What is the difference between Golden Teachers and other strains?',
    answer: 'Golden Teacher is a classic cubensis strain known for its moderate potency and warm, philosophical, and introspective insights. Strains like Penis Envy, on the other hand, are significantly more potent and offer intense visual experiences. We recommend Golden Teachers for beginners and Penis Envy or Amazonian strains for experienced explorers.'
  },
  {
    id: 5,
    category: 'Returns & Safety',
    question: 'How do I start microdosing and what is the recommended schedule?',
    answer: 'Microdosing involves taking a sub-perceptual amount of psilocybin (usually 100mg to 250mg) to boost focus, creativity, and mood. The most popular protocol is the Fadiman Protocol: Day 1 (Microdose), Day 2 (Transition/Reflect), Day 3 (Normal), Day 4 (Microdose). Start low and adjust according to your personal resonance.'
  }
]

const ALL_FAQS = [...SHIPPING_FAQS, ...RETURNS_FAQS]

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState('')

  // Separate open state for Shipping FAQs and Returns FAQs to replicate live site
  const [openShippingId, setOpenShippingId] = useState(1) // First item open by default
  const [openReturnsId, setOpenReturnsId] = useState(9)   // First item open by default
  const [openSearchId, setOpenSearchId] = useState(null)

  // Filter for search
  const searchedFaqs = ALL_FAQS.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleShipping = (id) => {
    setOpenShippingId(openShippingId === id ? null : id)
  }

  const toggleReturns = (id) => {
    setOpenReturnsId(openReturnsId === id ? null : id)
  }

  const toggleSearch = (id) => {
    setOpenSearchId(openSearchId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-zinc-900 pt-0 pb-0 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#01CBDF]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FA0C83]/[0.02] blur-[150px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <div className="relative w-full bg-[#101012] pt-32 pb-24 md:pt-44 md:pb-32 mb-16 text-center overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={main5}
            alt="FAQ Background"
            className="w-full h-full object-cover"
            animate={{
              scale: [1.02, 1.10, 1.02],
              x: [-5, 5, -5],
              y: [-3, 3, -3]
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
        <HeroParticle x={15} y={25} size={4} color="#FA0C83" duration={8} delay={0} />
        <HeroParticle x={82} y={35} size={5} color="#01CBDF" duration={11} delay={1.5} />
        <HeroParticle x={28} y={70} size={3} color="#ffffff" duration={7} delay={3} />
        <HeroParticle x={72} y={80} size={6} color="#FA0C83" duration={13} delay={4.5} />
        <HeroParticle x={48} y={15} size={4} color="#01CBDF" duration={9} delay={6} />

        {/* Dynamic watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
          <h1 className="text-[12vw] font-black text-white/[0.015] tracking-tighter uppercase whitespace-nowrap leading-none font-display text-center">
            FAQ
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
            FAQ
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
            <span className="text-white">FAQ</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Search Bar */}
        <div className="relative w-full max-w-xl mx-auto mb-16">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for questions (e.g. shipping, dosage)..."
            className="w-full bg-white border border-zinc-200 focus:border-[#FA0C83] focus:shadow-[0_0_15px_rgba(250,12,131,0.05)] text-zinc-900 placeholder-zinc-400 text-sm px-5 py-4.5 pl-12 rounded-full outline-none transition-all duration-300 shadow-sm"
          />
          <Search className="w-5 h-5 text-zinc-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* FAQ Contents */}
        {searchQuery === '' ? (
          /* Symmetrical 2-Column Accordion Layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Column 1: SHIPPING INFORMATION */}
            <div className="space-y-6">
              <div className="relative pb-3 mb-6 border-b border-zinc-200">
                <h3 className="text-sm font-black tracking-widest text-zinc-800 uppercase flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#01CBDF]" /> Shipping & Ordering
                </h3>
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
              </div>

              <div className="space-y-4">
                {SHIPPING_FAQS.map((faq) => {
                  const isOpen = openShippingId === faq.id
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-2xl overflow-hidden bg-white transition-all duration-300 ${
                        isOpen ? 'border-[#FA0C83] bg-white shadow-md shadow-[#FA0C83]/5' : 'border-zinc-200 bg-white hover:border-zinc-300'
                      }`}
                    >
                      <button
                        onClick={() => toggleShipping(faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer outline-none"
                      >
                        <span className={`text-xs md:text-sm font-bold tracking-wide transition-colors ${
                          isOpen ? 'text-[#FA0C83]' : 'text-zinc-800'
                        }`}>
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-[#FA0C83]' : 'text-zinc-500'
                          }`}
                        />
                      </button>

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs md:text-sm leading-relaxed font-normal pt-3 border-t text-zinc-650 border-t-zinc-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Column 2: RETURNS & REFUNDS */}
            <div className="space-y-6">
              <div className="relative pb-3 mb-6 border-b border-zinc-200">
                <h3 className="text-sm font-black tracking-widest text-zinc-800 uppercase flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#01CBDF]" /> Returns & Safety
                </h3>
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
              </div>

              <div className="space-y-4">
                {RETURNS_FAQS.map((faq) => {
                  const isOpen = openReturnsId === faq.id
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-2xl overflow-hidden bg-white transition-all duration-300 ${
                        isOpen ? 'border-[#FA0C83] bg-white shadow-md shadow-[#FA0C83]/5' : 'border-zinc-200 bg-white hover:border-zinc-300'
                      }`}
                    >
                      <button
                        onClick={() => toggleReturns(faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer outline-none"
                      >
                        <span className={`text-xs md:text-sm font-bold tracking-wide transition-colors ${
                          isOpen ? 'text-[#FA0C83]' : 'text-zinc-800'
                        }`}>
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-[#FA0C83]' : 'text-zinc-500'
                          }`}
                        />
                      </button>

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs md:text-sm leading-relaxed font-normal pt-3 border-t text-zinc-650 border-t-zinc-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        ) : (
          /* Search results layout */
          <div className="max-w-3xl mx-auto space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">
              Search Results ({searchedFaqs.length})
            </h4>

            <AnimatePresence mode="popLayout">
              {searchedFaqs.length > 0 ? (
                searchedFaqs.map((faq) => {
                  const isOpen = openSearchId === faq.id
                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`border rounded-2xl overflow-hidden bg-white transition-all duration-300 ${
                        isOpen ? 'border-[#FA0C83] bg-white shadow-md shadow-[#FA0C83]/5' : 'border-zinc-200 bg-white hover:border-zinc-300'
                      }`}
                    >
                      <button
                        onClick={() => toggleSearch(faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer outline-none"
                      >
                        <span className={`text-xs md:text-sm font-bold tracking-wide transition-colors ${
                          isOpen ? 'text-[#FA0C83]' : 'text-zinc-800'
                        }`}>
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-[#FA0C83]' : 'text-zinc-500'
                          }`}
                        />
                      </button>

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs md:text-sm leading-relaxed font-normal pt-3 border-t text-zinc-650 border-t-zinc-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })
              ) : (
                <div className="text-center py-16 border border-dashed border-zinc-200 rounded-2xl bg-white shadow-sm">
                  <HelpCircle className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                  <p className="text-zinc-500 text-xs">No matching questions found. Try searching something else.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Contact CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white border border-zinc-200 p-8 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-md"
        >
          <div className="absolute inset-0 bg-[#01CBDF]/[0.01] blur-md pointer-events-none" />
          <MessageSquare className="w-8 h-8 text-[#01CBDF] mx-auto animate-bounce" />

          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-zinc-900">Still Have Questions?</h3>
            <p className="text-zinc-600 text-xs max-w-lg mx-auto leading-relaxed">
              If you couldn’t find what you were looking for, please don’t hesitate to contact our dedicated customer support squad.
            </p>
          </div>

          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-black uppercase tracking-widest hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #FA0C83, #01CBDF)' }}
          >
            Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>

      {/* WAVY DIVIDER: Page to Footer */}
      <div className="w-full overflow-hidden leading-[0] bg-[#f4f4f6] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.12" />
          <path d="M0,75 C300,35 600,100 900,45 C1050,15 1120,55 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.1" />
          <path d="M0,88 C250,55 550,95 850,55 C1000,35 1100,70 1200,62 L1200,120 L0,120 Z" fill="#111113" />
        </svg>
      </div>
    </div>
  )
}
