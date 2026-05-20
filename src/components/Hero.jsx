import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShoppingCart, Sparkles, ShieldCheck, Zap } from 'lucide-react'

import main1 from '../assets/main1.jpg'
import main2 from '../assets/main2.jpg'
import main3 from '../assets/main3.jpg'
import main4 from '../assets/main4.jpg'

export default function Hero({ onShopNowClick }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const buttonRef = useRef(null)
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 })

  const slides = [
    {
      id: 1,
      image: main1,
      tag: "COLLECTION 01 // MAGIC PSILOCYBIN",
      accentTitle: "PREMIUM",
      mainTitle: "CULTIVATION",
      desc: "Experience the ultimate gold standard of organic magic mushrooms. Hand-harvested, slow-cured, and lab-tested to deliver pure, mind-expanding journeys and profound spiritual clarity.",
      features: ["100% Organic Spores", "Optimal Potency", "Lab Certified Pure"],
      badge: "BEST SELLER // CLASSIC",
      spec1Title: "SPECIES",
      spec1Val: "GOLDEN TEACHER",
      spec2Title: "POTENCY",
      spec2Val: "ELEVATED GRADE",
      spec2Sub: "TRIP RATING: ★★★★★"
    },
    {
      id: 2,
      image: main2,
      tag: "COLLECTION 02 // FOCUS & ENERGY",
      accentTitle: "EVOLVED",
      mainTitle: "MICRODOSE",
      desc: "Enhance your daily cognitive potential. Expertly measured sub-perceptual shroom capsules designed to augment concentration, relieve anxiety, and expand creative flow without hallucinations.",
      features: ["Precision Vegan Caps", "Cognitive Enhancement", "Non-Hallucinogenic"],
      badge: "POPULAR // ACTIVE FORMULA",
      spec1Title: "FORMULA",
      spec1Val: "MIND ENERGY",
      spec2Title: "DOSING",
      spec2Val: "150MG PER CAP",
      spec2Sub: "30 CAPS PER BOTTLE"
    },
    {
      id: 3,
      image: main3,
      tag: "COLLECTION 03 // CRYOGENIC RESERVE",
      accentTitle: "FREEZE DRIED",
      mainTitle: "INTEGRITY",
      desc: "A revolutionary scientific leap in shroom preservation. Cryogenic freeze-drying locked-in 100% of the active compound structure, producing a delightful crispy texture and an unmatched shelf life.",
      features: ["Cryo-Locked Compounds", "Crispy Delight Texture", "24-Month Active Life"],
      badge: "INNOVATION COLLECTION",
      spec1Title: "TECH SHIELD",
      spec1Val: "CRYO-LOCK INTENSE",
      spec2Title: "SHELF LIFE",
      spec2Val: "24 MONTHS STABLE",
      spec2Sub: "NO REFRIGERATION"
    },
    {
      id: 4,
      image: main4,
      tag: "COLLECTION 04 // INDULGENT EDIBLES",
      accentTitle: "PSYCHEDELIC",
      mainTitle: "CONFECTIONERY",
      desc: "Delectable Belgian chocolate and artisanal gummy fusions infused with purified psilocybin extract. Indulge in gourmet flavor profiles meticulously balanced with accurate portion dosing.",
      features: ["Artisanal Dark Cocoa", "Purified Extract", "Accurate Microdosing"],
      badge: "NEW DROP RELEASE",
      spec1Title: "INFUSED",
      spec1Val: "72% BELGIAN COCOA",
      spec2Title: "EXTRACT",
      spec2Val: "ULTRA PURIFIED",
      spec2Sub: "DELICATE STRAWBERRY"
    }
  ]

  const handleNext = () => setActiveSlide((prev) => (prev + 1) % slides.length)
  const handlePrev = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 10000)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    })
  }

  const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 })

  const handleButtonMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    setButtonOffset(dist < 100 ? { x: dx * 0.35, y: dy * 0.35 } : { x: 0, y: 0 })
  }

  const handleButtonLeave = () => setButtonOffset({ x: 0, y: 0 })

  const leftColumnVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.25, delayChildren: 0.1 }
    },
    exit: {
      transition: { staggerChildren: 0.06, staggerDirection: -1 }
    }
  }

  const rightColumnVariants = {
    initial: { opacity: 0, x: 120, filter: 'blur(12px)', scale: 0.96 },
    animate: {
      opacity: 1, x: 0, filter: 'blur(0px)', scale: 1,
      transition: { duration: 0.6, ease: [0.10, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0, x: 80, filter: 'blur(8px)', scale: 0.98,
      transition: { duration: 0.3, ease: [0.10, 1, 0.3, 1] }
    }
  }

  // Each child slides in from the left, line by line
  const childVariants = {
    initial: { opacity: 0, x: -60, filter: 'blur(6px)' },
    animate: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.10, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0, x: -40, filter: 'blur(4px)',
      transition: { duration: 0.25, ease: [0.10, 1, 0.3, 1] }
    }
  }

  const floatingCardLeftVariants = {
    initial: { opacity: 0, scale: 0.8, x: -30 },
    animate: { opacity: 1, scale: 1, x: 0, transition: { type: 'spring', delay: 0.5, stiffness: 90, damping: 14 } }
  }

  const floatingCardRightVariants = {
    initial: { opacity: 0, scale: 0.8, x: 30 },
    animate: { opacity: 1, scale: 1, x: 0, transition: { type: 'spring', delay: 0.6, stiffness: 90, damping: 14 } }
  }

  const slide = slides[activeSlide]

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full min-h-screen bg-[#161616] border-b border-zinc-900 pt-36 pb-24 md:pt-48 md:pb-28 px-4 md:px-12 lg:px-16 flex items-center justify-center relative overflow-hidden font-sans select-none"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 opacity-50" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-[#FA0C83]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none z-0" />

      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <motion.h1
          className="text-[14vw] font-black text-white/[0.015] tracking-tighter uppercase whitespace-nowrap leading-none font-display text-center"
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          FUN GUYZ RESERVE
        </motion.h1>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full"
          >
            {/* LEFT COLUMN: TEXT */}
            <motion.div
              variants={leftColumnVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="col-span-12 lg:col-span-6 space-y-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full px-2 lg:px-4"
            >
              <motion.div
                variants={childVariants}
                className="flex items-center gap-2 px-4 py-1.5 bg-[#FA0C83]/10 border border-[#FA0C83]/20 rounded-full w-fit"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FA0C83] animate-pulse" />
                <span className="text-[10px] font-black text-[#FA0C83] uppercase tracking-widest font-display">
                  {slide.tag}
                </span>
              </motion.div>

              <div className="space-y-1 max-w-xl">
                <motion.h2
                  variants={childVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-[1.1] uppercase"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">{slide.accentTitle}</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA0C83] to-[#01CBDF]">{slide.mainTitle}</span>
                </motion.h2>
              </div>

              <motion.p
                variants={childVariants}
                className="text-zinc-400 text-sm md:text-base font-medium max-w-lg leading-relaxed font-sans"
              >
                {slide.desc}
              </motion.p>

              <motion.div
                variants={childVariants}
                className="flex flex-wrap gap-2.5 pt-2 justify-center lg:justify-start"
              >
                {slide.features.map((feat, index) => (
                  <div key={index} className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-1.5 px-3.5 rounded-xl">
                    <Zap className="w-3.5 h-3.5 text-[#FA0C83]" />
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest font-display">{feat}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={childVariants} className="pt-2 h-20 flex items-center justify-center">
                <motion.button
                  ref={buttonRef}
                  onMouseMove={handleButtonMove}
                  onMouseLeave={handleButtonLeave}
                  onClick={onShopNowClick}
                  animate={{ x: buttonOffset.x, y: buttonOffset.y }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.4 }}
                  className="px-10 py-4.5 bg-[#FA0C83] hover:bg-[#161616] text-white font-display font-extrabold text-sm tracking-widest rounded-2xl flex items-center gap-3 cursor-pointer shadow-xl shadow-[#FA0C83]/25 hover:shadow-black/40 transition-all duration-300 border-2 border-transparent hover:border-white/10 relative overflow-hidden group/btn z-20"
                >
                  <motion.div className="absolute inset-0 bg-[#161616] translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  <ShoppingCart className="w-5 h-5 relative z-10 transition-transform group-hover/btn:rotate-[-10deg]" />
                  <span className="relative z-10 uppercase">SHOP THE COLLECTION</span>
                </motion.button>
              </motion.div>

              <motion.div
                variants={childVariants}
                className="flex items-center gap-6 pt-4 text-[10px] font-black text-zinc-500 border-t border-zinc-900 w-full justify-center lg:justify-start"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="tracking-widest uppercase">100% SECURE CHECKOUT</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="tracking-widest uppercase">FAST DELIVERY & SHIPPING ACROSS CANADA!</span>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: IMAGE */}
            <motion.div
              variants={rightColumnVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="col-span-12 lg:col-span-6 flex justify-center items-center relative"
            >
              <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#FA0C83] to-orange-600 opacity-20 blur-[130px] pointer-events-none z-0" />

              <div className="w-full max-w-sm md:max-w-md h-[380px] md:h-[480px] rounded-[2.5rem] border-2 border-white/10 bg-gradient-to-b from-white/10 to-transparent p-3.5 shadow-2xl relative z-10 overflow-hidden backdrop-blur-md">
                <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative group">
                  <motion.img
                    style={{ x: mousePosition.x * -20, y: mousePosition.y * -20 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                    src={slide.image}
                    alt={slide.mainTitle}
                    className="w-[115%] h-[115%] object-cover absolute left-[-7.5%] top-[-7.5%] filter brightness-95 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/15 py-1.5 px-4 rounded-full z-20 flex items-center gap-1.5 shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-[#FA0C83] animate-pulse" />
                    <span className="text-[9px] font-black tracking-widest text-white uppercase font-display">{slide.badge}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end text-white z-20">
                    <span className="text-[10px] font-black text-[#FA0C83] tracking-widest uppercase">{slide.tag}</span>
                    <h4 className="font-display font-black text-2xl tracking-tighter mt-1 uppercase">{slide.mainTitle}</h4>
                  </div>
                </div>
              </div>

              {/* Floating spec card — left of image */}
              <motion.div
                variants={floatingCardLeftVariants}
                style={{ x: mousePosition.x * -25, y: mousePosition.y * 25 }}
                className="absolute z-30 bg-white/[0.02] backdrop-blur-xl border border-white/10 py-3 px-5 rounded-2xl shadow-2xl flex flex-col pointer-events-none select-none min-w-[170px] shadow-black/50 -left-6 md:-left-4 top-1/4"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FA0C83]" />
                  <span className="text-[8px] font-black text-zinc-400 tracking-widest uppercase font-display">{slide.spec1Title}</span>
                </div>
                <span className="text-[11px] font-black text-white tracking-tight mt-1 font-display">{slide.spec1Val}</span>
              </motion.div>

              {/* Floating spec card — right of image */}
              <motion.div
                variants={floatingCardRightVariants}
                style={{ x: mousePosition.x * 25, y: mousePosition.y * -25 }}
                className="absolute z-30 bg-[#161616]/90 backdrop-blur-xl border border-white/10 py-3 px-5 rounded-2xl shadow-2xl flex flex-col pointer-events-none select-none min-w-[170px] shadow-black/50 -right-6 md:-right-4 bottom-1/4"
              >
                <span className="text-[8px] font-black text-zinc-500 tracking-widest uppercase font-display">{slide.spec2Title}</span>
                <span className="text-[11px] font-black text-white tracking-tight mt-1 font-display">{slide.spec2Val}</span>
                <span className="text-[9px] font-bold text-[#FA0C83] tracking-wider mt-0.5 font-display">{slide.spec2Sub}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className="relative flex items-center justify-center w-8 h-8 focus:outline-none cursor-pointer group"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeSlide
                  ? 'bg-[#FA0C83] scale-110 shadow-[0_0_8px_rgba(250,12,131,0.5)]'
                  : 'bg-white/35 group-hover:bg-white group-hover:scale-110'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Arrow Buttons */}
      <div className="absolute bottom-8 right-12 hidden lg:flex items-center gap-4.5 z-20">
        <button
          onClick={handlePrev}
          className="p-3.5 bg-white/[0.02] border border-white/10 hover:border-[#FA0C83]/50 rounded-full text-white hover:text-[#FA0C83] hover:shadow-[0_0_20px_rgba(250,12,131,0.15)] transition-all cursor-pointer group focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={handleNext}
          className="p-3.5 bg-white/[0.02] border border-white/10 hover:border-[#FA0C83]/50 rounded-full text-white hover:text-[#FA0C83] hover:shadow-[0_0_20px_rgba(250,12,131,0.15)] transition-all cursor-pointer group focus:outline-none"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}
