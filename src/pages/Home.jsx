/* eslint-disable react-hooks/purity */
/* eslint-disable no-useless-assignment */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion'
import { Star, ArrowRight, Sparkles, Shuffle, ZoomIn, Truck, Calendar, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import Hero from '../components/Hero'
import ShippingModal from '../components/ShippingModal'

// Import user-uploaded luxury mushroom assets
import main5 from '../assets/main5.jpg'
import main6 from '../assets/main6.jpg'
import main7 from '../assets/main7.jpg'
import main1 from '../assets/main1.jpg'
import main4 from '../assets/main4.jpg'
import main2 from '../assets/main2.jpg'
import main3 from '../assets/main3.jpg'
import avatar1 from '../assets/images/customer1.jpg'
import avatar2 from '../assets/images/customer2.jpg'
import avatar3 from '../assets/images/customer3.jpg'
import customerbg from '../assets/images/customerbg.jpg'
// 3D Parallax Tilt Category Card Component with Cursor Spotlight and Glossy Shimmer
function CategoryCard({ cat, index, handleShopNowClick }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(0)
  const [glowY, setGlowY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const catAccents = ['#FA0C83', '#01CBDF', '#FA0C83']
  const catAccent = catAccents[index % catAccents.length]

  const displayNames = {
    'MUSHROOMS': 'Dried Mushrooms',
    'MICRODOSE': 'Microdose Capsules',
    'EDIBLES': 'Mushroom Edibles'
  }
  const displayName = displayNames[cat.name] || cat.name

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()

    // Calculate cursor positions from -0.5 to 0.5 relative to center of the card
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Map to dynamic rotation angles (max 15 degrees)
    setRotateX(-y * 22)
    setRotateY(x * 22)

    // Map to absolute pixels inside card bounding rect for the cursor glow spotlight
    setGlowX(e.clientX - rect.left)
    setGlowY(e.clientY - rect.top)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleShopNowClick}
      initial={{
        opacity: 0,
        x: index === 0 ? -120 : index === 2 ? 120 : 0,
        y: index === 1 ? 120 : 0,
        scale: 0.9,
        filter: 'blur(12px)'
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.0, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        clipPath: 'inset(0px round 1rem)',
        WebkitClipPath: 'inset(0px round 1rem)',
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        y: isHovered ? -12 : 0,
        borderColor: isHovered ? catAccent : 'transparent',
      }}
      className="group relative h-[380px] md:h-[440px] rounded-2xl border-2 bg-zinc-950/40 backdrop-blur-md overflow-hidden cursor-pointer shadow-2xl transition-all duration-300"
    >
      <div className="w-full h-full relative rounded-2xl overflow-hidden">
        {/* 1. Dynamic Cursor Spotlight Glow */}
        <div
          style={{
            background: `radial-gradient(220px circle at ${glowX}px ${glowY}px, ${catAccent}15, transparent 80%)`,
            opacity: isHovered ? 1 : 0
          }}
          className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none"
        />

        {/* 2. Diagonal Glass Reflection Shimmer Sheen */}
        <div
          className="absolute inset-0 w-[200%] h-full z-20 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* 3. Lighter Cinematic Ambient Shadow Shading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/45 z-10 transition-colors duration-500 group-hover:via-black/5" />
        <div className="absolute -inset-1 bg-gradient-to-tr from-[#FA0C83]/0 via-[#FA0C83]/0 to-[#FA0C83]/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 z-0" />

        {/* 4. Category Image with Parallax Depth Shift */}
        <div className="w-full h-full overflow-hidden absolute inset-0 z-0">
          <motion.img
            src={cat.image}
            alt={cat.name}
            animate={{
              scale: isHovered ? 1.12 : 1.02,
              x: rotateY * -0.5,
              y: rotateX * 0.5
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 18
            }}
            className="w-[110%] h-[110%] absolute -left-[5%] -top-[5%] object-cover filter brightness-[0.92] group-hover:brightness-[1.0] transition-all duration-500"
          />
        </div>

        {/* 5. Floating Glassmorphic tag */}
        <span className="absolute top-6 left-6 z-20 text-[9px] font-black text-white bg-black/60 border border-white/10 py-1.5 px-3.5 rounded-full uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 animate-pulse" style={{ color: catAccent }} />
          <span>{cat.tag}</span>
        </span>

        {/* 6. Centered Glassmorphic Category Banner (Elevated with 3D Z-index pop out) */}
        <div
          style={{ transform: 'translateZ(65px)' }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{
              backgroundColor: isHovered
                ? index % 2 === 0
                  ? 'rgba(20, 5, 12, 0.92)' // dark magenta-pink glass on hover (very opaque for high text contrast)
                  : 'rgba(5, 18, 20, 0.92)'  // dark cyan glass on hover
                : 'rgba(22, 22, 22, 0.55)',
            }}
            transition={{ duration: 0.4 }}
            className="w-full py-6 backdrop-blur-md flex flex-col items-center justify-center text-center px-4 relative"
          >
            {/* Top Wavy Stroke Divider */}
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-[15px] -translate-y-[98%] pointer-events-none z-10">
              <path
                d="M0,90 C300,120 600,40 900,110 C1050,130 1150,90 1200,80 L1200,120 L0,120 Z"
                style={{
                  fill: isHovered
                    ? index % 2 === 0 ? 'rgba(20, 5, 12, 0.92)' : 'rgba(5, 18, 20, 0.92)'
                    : 'rgba(22, 22, 22, 0.55)',
                  stroke: isHovered ? catAccent : 'rgba(255, 255, 255, 0.15)',
                  strokeWidth: 4,
                  transition: 'fill 0.4s, stroke 0.4s'
                }}
              />
            </svg>

            {/* Category Name */}
            <motion.h3
              animate={{
                color: isHovered ? catAccent : '#ffffff',
                scale: isHovered ? 1.05 : 1,
                textShadow: isHovered ? `0 0 15px ${catAccent}66` : '0 2px 4px rgba(0,0,0,0.8)'
              }}
              transition={{ duration: 0.4 }}
              className="font-serif italic font-semibold text-lg sm:text-xl md:text-2xl tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-20"
            >
              {displayName}
            </motion.h3>

            {/* Description (subtle reveal on hover) */}
            <motion.p
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
                marginTop: isHovered ? 8 : 0
              }}
              transition={{ duration: 0.35 }}
              className="text-[11px] text-zinc-300 font-medium max-w-[280px] overflow-hidden drop-shadow-md leading-relaxed relative z-20"
            >
              {cat.desc}
            </motion.p>

            {/* Bottom Wavy Stroke Divider */}
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[15px] translate-y-[98%] pointer-events-none z-10 transform rotate-180">
              <path
                d="M0,90 C300,120 600,40 900,110 C1050,130 1150,90 1200,80 L1200,120 L0,120 Z"
                style={{
                  fill: isHovered
                    ? index % 2 === 0 ? 'rgba(20, 5, 12, 0.92)' : 'rgba(5, 18, 20, 0.92)'
                    : 'rgba(22, 22, 22, 0.55)',
                  stroke: isHovered ? catAccent : 'rgba(255, 255, 255, 0.15)',
                  strokeWidth: 4,
                  transition: 'fill 0.4s, stroke 0.4s'
                }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// 3D Parallax Tilt Offer Card Component with Spotlight Glow and Glassmorphism (Light Mode)
// ─── Continuously animated floating particle ───────────────────────────────
function LiveParticle({ x, y, size, color, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, left: `${x}%`, top: `${y}%`, filter: `blur(${size > 4 ? 1 : 0}px)` }}
      animate={{
        y: [0, -(14 + size * 2), 0],
        x: [0, size % 2 === 0 ? 6 : -6, 0],
        opacity: [0.15, 0.85, 0.15],
        scale: [0.7, 1.3, 0.7],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

// ─── Slow auto-panning image parallax ─────────────────────────────────────
function LiveImage({ src, alt, isHovered, rotateX, rotateY }) {
  const panX = useSpring(useMotionValue(0), { stiffness: 20, damping: 30 })
  const panY = useSpring(useMotionValue(0), { stiffness: 20, damping: 30 })
  useAnimationFrame((time) => {
    panX.set(Math.sin(time / 6000) * 8)
    panY.set(Math.cos(time / 8000) * 6)
  })
  return (
    <motion.img
      src={src}
      alt={alt}
      animate={{
        scale: isHovered ? 1.18 : 1.06,
        rotate: isHovered ? 1.5 : 0,
        x: rotateY * -0.7,
        y: rotateX * 0.7,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 22 }}
      className="absolute inset-0 w-full h-full object-cover z-[1]"
      style={{ filter: 'brightness(0.85) saturate(0.95)', willChange: 'transform', x: panX, y: panY }}
    />
  )
}

// ─── Breathing ambient glow that pulses continuously ──────────────────────
function AmbientGlow({ accent }) {
  return (
    <motion.div
      className="absolute inset-0 z-[5] pointer-events-none rounded-[2rem]"
      animate={{ opacity: [0.12, 0.3, 0.12], scale: [1, 1.04, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ background: `radial-gradient(ellipse at 50% 85%, ${accent.primary}55 0%, transparent 65%)` }}
    />
  )
}

// ─── Auto-moving gradient glow orb ────────────────────────────────────────
function RoamingGlow({ accent }) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  useAnimationFrame((t) => {
    setPos({ x: 50 + Math.sin(t / 4000) * 35, y: 50 + Math.cos(t / 5500) * 30 })
  })
  return (
    <div
      className="absolute inset-0 z-[6] pointer-events-none"
      style={{ background: `radial-gradient(260px circle at ${pos.x}% ${pos.y}%, ${accent.primary}1a, transparent 70%)` }}
    />
  )
}

// ─── Continuous shimmer sweep that loops forever ──────────────────────────
function ShimmerSweep() {
  return (
    <motion.div
      className="absolute top-0 bottom-0 w-[35%] -skew-x-12 pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.055) 50%, transparent)' }}
      animate={{ x: ['-120%', '380%'] }}
      transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
    />
  )
}

// ─── Animated conic border shimmer ────────────────────────────────────────
function AnimatedBorder({ accent, isHovered }) {
  const [deg, setDeg] = useState(0)
  useAnimationFrame((t) => { setDeg((t / 28) % 360) })
  return (
    <div
      className="absolute inset-0 z-[45] rounded-[2rem] pointer-events-none"
      style={{
        padding: '1.5px',
        background: isHovered
          ? `conic-gradient(from ${deg}deg at 50% 50%, transparent 0deg, ${accent.primary} 60deg, ${accent.secondary} 120deg, transparent 200deg, transparent 360deg)`
          : `conic-gradient(from ${deg}deg at 50% 50%, transparent 0deg, ${accent.primary}55 40deg, transparent 120deg, transparent 360deg)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
    />
  )
}

// ─── Premium Live Offer Card ───────────────────────────────────────────────
function OfferCard({ offer, handleShopNowClick, index }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(50)
  const [glowY, setGlowY] = useState(50)
  const [isHovered, setIsHovered] = useState(false)

  const accents = [
    { primary: '#FA0C83', secondary: '#01CBDF', glow: 'rgba(250,12,131,0.25)' },
    { primary: '#01CBDF', secondary: '#FA0C83', glow: 'rgba(1,203,223,0.25)' },
    { primary: '#FA0C83', secondary: '#01CBDF', glow: 'rgba(250,12,131,0.25)' },
  ]
  const accent = accents[index % accents.length]

  const particles = [
    { x: 12, y: 72, size: 3, color: accent.primary, duration: 3.2, delay: 0 },
    { x: 82, y: 58, size: 2, color: accent.secondary, duration: 2.8, delay: 0.7 },
    { x: 48, y: 82, size: 4, color: accent.primary, duration: 3.8, delay: 1.2 },
    { x: 28, y: 38, size: 2, color: '#ffffff', duration: 2.5, delay: 0.4 },
    { x: 68, y: 22, size: 3, color: accent.secondary, duration: 3.5, delay: 1.8 },
    { x: 91, y: 78, size: 2, color: '#ffffff', duration: 2.9, delay: 0.9 },
    { x: 55, y: 50, size: 2, color: accent.primary, duration: 4.1, delay: 2.1 },
    { x: 20, y: 90, size: 3, color: accent.secondary, duration: 3.0, delay: 1.5 },
    { x: 75, y: 42, size: 2, color: '#ffffff', duration: 2.6, delay: 0.2 },
    { x: 38, y: 65, size: 3, color: accent.primary, duration: 3.6, delay: 2.4 },
    { x: 60, y: 15, size: 2, color: accent.secondary, duration: 2.7, delay: 1.0 },
    { x: 88, y: 30, size: 3, color: '#ffffff', duration: 3.3, delay: 1.7 },
  ]

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotateX(-y * 18)
    setRotateY(x * 18)
    setGlowX(((e.clientX - rect.left) / rect.width) * 100)
    setGlowY(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotateX(0); setRotateY(0) }}
      onClick={offer.onClick || handleShopNowClick}
      initial={{
        opacity: 0,
        x: index === 0 ? -120 : index === 2 ? 120 : 0,
        y: index === 1 ? 120 : 0,
        scale: 0.9
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.0, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -18 : [0, -7, 0],
        scale: isHovered ? 1.03 : 1,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1100,
        filter: isHovered
          ? `drop-shadow(0 20px 40px ${accent.glow})`
          : `drop-shadow(0 10px 25px rgba(0,0,0,0.15))`,
        transition: 'filter 0.45s ease',
      }}
      className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer"
    >
      {/* 1. Deep black glass base */}
      <div
        className="absolute inset-0 z-0"
      // style={{ background: 'linear-gradient(145deg, #131313 0%, #090909 55%, #161616 100%)' }}
      />

      {/* 2. Slow auto-parallax image */}
      <LiveImage src={offer.image} alt={offer.title} isHovered={isHovered} rotateX={rotateX} rotateY={rotateY} />

      {/* 3. Cinematic gradient overlay */}
      <div
        className="absolute inset-0 z-[8] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.08) 75%, transparent 100%)' }}
      />

      {/* 4. Breathing ambient glow */}
      <AmbientGlow accent={accent} />

      {/* 5. Roaming gradient orb */}
      <RoamingGlow accent={accent} />

      {/* 6. Cursor spotlight */}
      <motion.div
        className="absolute inset-0 z-[12] pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(300px circle at ${glowX}% ${glowY}%, ${accent.primary}28, transparent 65%)` }}
      />

      {/* 7. Shimmer sweep */}
      <div className="absolute inset-0 z-[14] overflow-hidden pointer-events-none">
        <ShimmerSweep />
      </div>

      {/* 8. Conic border shimmer */}
      <AnimatedBorder accent={accent} isHovered={isHovered} />

      {/* 9. Always-on floating particles */}
      <div className="absolute inset-0 z-[16] pointer-events-none">
        {particles.map((p, i) => <LiveParticle key={i} {...p} />)}
      </div>

      {/* 10. Scanlines */}
      <div
        className="absolute inset-0 z-[17] pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)' }}
      />

      {/* 11. Tag badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.14 + 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-6 z-[50]"
        style={{ transform: 'translateZ(35px)' }}
      >
        <motion.span
          animate={{ boxShadow: [`0 4px 14px ${accent.glow}`, `0 8px 26px ${accent.glow}`, `0 4px 14px ${accent.glow}`] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full"
          style={{ background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})` }}
        >
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white inline-block"
          />
          {offer.tag}
        </motion.span>
      </motion.div>



      {/* 13. Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-[50] p-7" style={{ transform: 'translateZ(50px)' }}>
        <div
          className="absolute inset-0 rounded-b-[2rem] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)' }}
        />
        <div className="relative space-y-2">
          {/* Brand/Product Name (Magic Mushroom) */}
          <motion.p
            animate={{ opacity: isHovered ? 1 : 0.75, x: isHovered ? 0 : -2 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] font-black uppercase tracking-[0.25em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            style={{ color: '#ffffff' }}
          >
            {offer.title}
          </motion.p>

          {/* Huge Offer Text (20% OFF) */}
          <motion.h3
            animate={{ scale: isHovered ? 1.04 : 1 }}
            className="font-black text-[2.2rem] leading-none uppercase tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            style={{
              background: `linear-gradient(135deg, #ffffff 40%, ${accent.primary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {offer.offerText}
          </motion.h3>

          {/* Subtitle (Your Next Order) */}
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {offer.subtitle}
          </p>

          {/* Accent line — breathes when idle, fills on hover */}
          <motion.div
            animate={{ width: isHovered ? '100%' : ['22px', '42px', '22px'] }}
            transition={isHovered
              ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
            }
            className="h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})` }}
          />

          {/* Coupon Code & Shop Now Side-by-Side Wrapper */}
          <div className="flex items-center gap-3 pt-1">
            <motion.div
              animate={{ borderColor: isHovered ? accent.primary : 'rgba(255,255,255,0.2)' }}
              className="px-3.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white font-mono font-black text-[11px] tracking-wider uppercase"
              style={{
                boxShadow: isHovered ? `0 0 15px ${accent.glow}` : 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {offer.coupon}
            </motion.div>

            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
              transition={{ duration: 0.28 }}
              className="flex items-center gap-1.5 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                boxShadow: `0 4px 12px ${accent.glow}`,
              }}
            >
              Shop Now
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Premium Showroom Product Card with Stacked Fan Cards, Spotlight Glow, 3D Spring Tilt & Cyberpunk Hover Shadows
function ShowroomProductCard({ product, handleAddToCart, variants }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(0)
  const [glowY, setGlowY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()

    // Calculate cursor positions from -0.5 to 0.5 relative to center of the card
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Map to subtle tilting angles
    setRotateX(-y * 12)
    setRotateY(x * 12)

    // Map to absolute pixels inside card bounding rect for the cursor glow spotlight
    setGlowX(e.clientX - rect.left)
    setGlowY(e.clientY - rect.top)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      className="w-full h-full cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          y: isHovered ? -8 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 18,
          mass: 0.5
        }}
        className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-500 rounded-xl p-4 flex flex-col relative group cursor-pointer hover:shadow-[0_20px_45px_rgba(250,12,131,0.22)] hover:border-[#FA0C83] transition-all duration-300 overflow-hidden h-full w-full "
      >
        {/* Sliding White Hover Background (Bottom-Left to Top-Right) */}
        <div
          className={`absolute inset-0 bg-white rounded-xl z-0 pointer-events-none transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'
            }`}
        />

        {/* 1. Shimmer, Spotlight and Holographic Foil (Rounded, clipped inside card body) */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-20">
          {/* Dynamic Cursor Spotlight Glow */}
          <div
            style={{
              background: `radial-gradient(180px circle at ${glowX}px ${glowY}px, rgba(249, 54, 45, 0.08), transparent 85%)`,
              opacity: isHovered ? 1 : 0
            }}
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          />

          {/* Holographic Iridescent Sheen Overlay */}
          <div
            style={{
              background: `radial-gradient(circle at ${glowX}px ${glowY}px, rgba(255, 255, 255, 0.15) 0%, rgba(0, 240, 255, 0.08) 30%, rgba(255, 0, 128, 0.08) 60%, transparent 80%)`,
              mixBlendMode: 'color-dodge',
              opacity: isHovered ? 1 : 0
            }}
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          />

          {/* Diagonal Glass Reflection Shimmer Sheen */}
          <div
            className="absolute inset-0 w-[200%] h-full pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>

        {/* Floating Spore Particles (Levitating Magic Spores) */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] z-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 200 + 40,
                  y: 350,
                  opacity: 0,
                  scale: Math.random() * 0.4 + 0.6
                }}
                animate={{
                  y: [-20, -120 - Math.random() * 150],
                  x: [null, Math.random() * 60 - 30],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  delay: i * 0.45,
                  ease: "easeOut"
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FA0C83] to-amber-400 blur-[1px] shadow-[0_0_8px_#FA0C83]"
              />
            ))}
          </div>
        )}

        {/* 2. Interactive Portal & Image Frame */}
        <div className="w-full aspect-[4/4] relative flex items-center justify-center flex-shrink-0 z-10 mb-5 select-none">

          {/* Glowing Portal Ring behind the image */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.85 : 0,
              scale: isHovered ? 1.15 : 0.8,
              rotate: isHovered ? 360 : 0
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { type: 'spring', stiffness: 80, damping: 15 },
              rotate: { repeat: Infinity, duration: 10, ease: "linear" }
            }}
            className="absolute w-[95%] h-[95%] rounded-full bg-gradient-to-tr from-[#FA0C83]/30 via-purple-600/20 to-cyan-500/10 blur-[20px] pointer-events-none"
          />

          {/* Front Product Card Frame */}
          <div className="absolute inset-0 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-2xl flex items-center justify-center z-10 group/image">
            {/* Subtle Ambient Vignette inside the front image card */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50 z-10 pointer-events-none" />

            {/* Product Image */}
            <motion.img
              src={product.image}
              alt={product.name}
              className={`w-[100%] h-[100%] object-cover transition-all duration-300 ${isHovered ? 'filter blur-[3px] brightness-[0.6]' : 'filter brightness-[0.88]'}`}
            />

            {/* Float Badge */}
            <span className="absolute top-3.5 left-3.5 text-[8px] font-black text-white bg-[#FA0C83] py-1 px-3 rounded-full uppercase tracking-wider shadow-md z-20">
              {product.badge}
            </span>

            {/* Quick Add overlay button */}
            <div
              className={`absolute inset-0 bg-black/50 backdrop-blur-[2.5px] transition-all duration-300 flex items-center justify-center z-20 ${isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (handleAddToCart) handleAddToCart(product);
                }}
                className={`bg-white hover:bg-[#FA0C83] hover:text-white text-[#161616] font-display font-black text-[10px] py-2.5 px-5.5 rounded-xl shadow-lg transition-all duration-300 transform cursor-pointer ${isHovered ? 'translate-y-0' : 'translate-y-3'}`}
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>

        {/* 3. Product Details */}
        <div className="flex-1 flex flex-col justify-between space-y-3.5 z-10" style={{ transform: 'translateZ(25px)' }}>
          <div className="space-y-1">
            {/* Category block */}
            <span className={`text-[10px] font-medium uppercase tracking-wider font-sans block transition-colors duration-300 ${isHovered ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {product.category}, {product.category} CAPSULES
            </span>

            {/* Title */}
            <h3 className={`font-sans font-semibold text-sm md:text-[15px] group-hover:text-[#FA0C83] transition-colors duration-300 line-clamp-1 leading-snug ${isHovered ? 'text-zinc-900' : 'text-zinc-100'}`}>
              {product.name}
            </h3>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center gap-2.5">
            <span className={`text-sm md:text-base font-bold font-sans transition-colors duration-300 ${isHovered ? 'text-zinc-900' : 'text-white'}`}>
              ${product.price.toFixed(2)}–${(product.originalPrice || product.price * 2).toFixed(2)}
            </span>
            <span className="text-[11px] font-extrabold text-[#28a745] font-sans">
              {product.originalPrice ? '20% Off' : '15% Off'}
            </span>
          </div>

          {/* Actions Row */}
          <div className={`flex items-center gap-2 pt-2 border-t transition-colors duration-300 ${isHovered ? 'border-zinc-200' : 'border-zinc-800/40'}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (handleAddToCart) handleAddToCart(product);
              }}
              className="bg-[#FA0C83] hover:bg-[#01CBDF] text-white font-sans font-bold text-[10px] md:text-xs py-2 px-3 rounded-md transition-colors flex-1 text-center cursor-pointer uppercase tracking-wider  flex items-center justify-center"
            >
              SELECT OPTIONS
            </button>

            {/* Shuffle / Compare */}
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`w-[38px] h-[38px] border rounded-md flex items-center justify-center transition-all cursor-pointer ${isHovered ? 'border-zinc-200 text-zinc-500 hover:text-white hover:bg-zinc-900 hover:border-zinc-900' : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Quick View / ZoomIn */}
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`w-[38px] h-[38px] border rounded-md flex items-center justify-center transition-all cursor-pointer ${isHovered ? 'border-zinc-200 text-zinc-500 hover:text-white hover:bg-zinc-900 hover:border-zinc-900' : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const { handleShopNowClick, handleAddToCart, handleAddToWishlist } = useOutletContext() || {};


  const [activeReview, setActiveReview] = useState(0)
  const [activeBlog, setActiveBlog] = useState(0)
  const [blogDirection, setBlogDirection] = useState(1)
  const [blogTimerKey, setBlogTimerKey] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])



  const reviews = [
    {
      name: "Jessica M.",
      location: "Toronto, ON",
      rating: 5,
      text: "Absolute game changer. The microdose capsules helped me regain mental clarity and crushed my daily anxiety. Quick shipping too!",
      product: "Microdose Calm Capsules",
      avatar: avatar1,
      date: "2 days ago"
    },
    {
      name: "David K.",
      location: "Vancouver, BC",
      rating: 5,
      text: "The Belgian dark chocolate edibles are not only delicious, but the dosing is incredibly accurate. 10/10 will order again.",
      product: "Belgian Dark Confectionery",
      avatar: avatar2,
      date: "1 week ago"
    },
    {
      name: "Sarah L.",
      location: "Montreal, QC",
      rating: 5,
      text: "High quality magic strains, professionally packaged and delivered discreetly. Funguyz is the gold standard in Canada.",
      product: "Dried Reserve Strains",
      avatar: avatar3,
      date: "3 days ago"
    }
  ]

  const features = [
    {
      icon: Sparkles,
      title: "First-Time Customer?",
      desc: "Enjoy 20% off your first order of premium magic mushrooms, starting here.",
      stat: "20% Welcome Discount"
    },
    {
      icon: Shuffle,
      title: "Bundle & Save",
      desc: "Curated mushroom combos — mix strains, capsules & edibles at up to 30% off.",
      stat: "Up to 30% Off Bundles"
    },
    {
      icon: Calendar,
      title: "Daily Dose Discount",
      desc: "Subscribe & save 25% on your monthly microdose essentials. Cancel anytime.",
      stat: "25% Subscribe & Save"
    },
    {
      icon: Truck,
      title: "Free Shipping Canada-Wide",
      desc: "On all orders over $150. Delivered discreetly and securely to your door.",
      stat: "Free on Orders $150+"
    }
  ]

  const blogPosts = [
    {
      title: "How to Choose the Perfect Magic Mushroom Dose",
      image: main1,
      desc: "From beginner microdoses to deep therapeutic journeys, learn how to calibrate your experience safely.",
      date: "May 18, 2026",
      tag: "GUIDES",
      author: "Dr. Shroom"
    },
    {
      title: "The Science of Psilocybin and Neuroplasticity",
      image: main2,
      desc: "Explore the latest clinical studies showing how microdosing can forge new pathways in the human brain.",
      date: "May 15, 2026",
      tag: "SCIENCE",
      author: "Neuro Team"
    },
    {
      title: "Inside Our Gourmet Infused Confectionery Process",
      image: main3,
      desc: "Go behind the scenes of our confectionery kitchen where culinary arts meet premium psilocybin extract.",
      date: "May 10, 2026",
      tag: "CULTURE",
      author: "Chef Funguy"
    },
    {
      title: "Microdosing Protocols: Fadiman vs. Stamets Method",
      image: main4,
      desc: "An in-depth comparison of the two leading microdosing regimens, schedules, and recommended protocols.",
      date: "May 08, 2026",
      tag: "PROTOCOL",
      author: "Elena R."
    },
    {
      title: "Unlocking the Spiritual Potential of Magic Honey",
      image: main5,
      desc: "Discover the ancient history, benefits, and preparation guidelines for organic, psilocybin-infused honey.",
      date: "May 05, 2026",
      tag: "HISTORY",
      author: "Zen Alchemist"
    },
    {
      title: "The Legality and Research of Mushrooms in Canada",
      image: main6,
      desc: "Get up to speed with the latest legislative policies, medical exemptions, and research updates in Canada.",
      date: "May 02, 2026",
      tag: "COMPLIANCE",
      author: "Barrister Cole"
    }
  ]

  // Removed auto-play for testimonials as requested

  useEffect(() => {
    const timer = setInterval(() => {
      setBlogDirection(1)
      setActiveBlog((prev) => (prev + 1) % blogPosts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [blogPosts.length, blogTimerKey])

  // Premium mushroom showroom items
  const tabShowroomProducts = {
    'best-selling': [
      {
        id: 201,
        name: 'Golden Teacher Magic Mushrooms (AAA)',
        price: 49.99,
        image: main5,
        badge: 'TOP RATED',
        rating: 5,
        category: 'PSYCHEDELICS',
        specs: [
          { val: '3.1g', label: 'Prebiotics' },
          { val: '0g', label: 'Sugar' },
          { val: '3.1g', label: 'Mushroom' }
        ]
      },
      {
        id: 202,
        name: 'Blue Meanie High-Potency Shrooms',
        price: 59.99,
        image: main6,
        badge: 'HIGH POTENCY',
        rating: 4.9,
        category: 'PSYCHEDELICS',
        specs: [
          { val: '4.5g', label: 'Prebiotics' },
          { val: '0g', label: 'Sugar' },
          { val: '4.5g', label: 'Mushroom' }
        ]
      },
      {
        id: 203,
        name: 'Premium Mind-Focus Microdose Caps',
        price: 39.99,
        image: main7,
        badge: 'BEST SELLER',
        rating: 4.8,
        category: 'MICRODOSE',
        specs: [
          { val: '150mg', label: 'Active Dose' },
          { val: '0g', label: 'Sugar' },
          { val: '30 Caps', label: 'Servings' }
        ]
      },
      {
        id: 204,
        name: 'Freeze Dried Amazonian Cryo-Shrooms',
        price: 64.99,
        image: main1,
        badge: 'CRYO RESERVE',
        rating: 5,
        category: 'FREEZE DRIED',
        specs: [
          { val: '3.5g', label: 'Prebiotics' },
          { val: '0g', label: 'Sugar' },
          { val: 'Cryo', label: 'Mushroom' }
        ]
      }
    ],
    'featured': [
      {
        id: 205,
        name: 'Penis Envy Premium Grade Capsules',
        price: 69.99,
        image: main3,
        badge: 'HOT SELLER',
        rating: 4.9,
        category: 'CAPSULES',
        specs: [
          { val: '200mg', label: 'Active Dose' },
          { val: '0g', label: 'Sugar' },
          { val: '24 Caps', label: 'Servings' }
        ]
      },
      {
        id: 206,
        name: 'Albino A+ Exotic Organic Cultivation',
        price: 54.99,
        image: main2,
        badge: 'EXOTIC SPECIES',
        rating: 4.8,
        category: 'PSYCHEDELICS',
        specs: [
          { val: '3.0g', label: 'Prebiotics' },
          { val: '0g', label: 'Sugar' },
          { val: '3.0g', label: 'Mushroom' }
        ]
      },
      {
        id: 207,
        name: 'Gourmet Psilocybin Belgian Dark Chocolate',
        price: 34.99,
        image: main4,
        badge: 'HANDCRAFTED',
        rating: 4.7,
        category: 'EDIBLES',
        specs: [
          { val: '3.1g', label: 'Prebiotics' },
          { val: '2g', label: 'Sugar' },
          { val: '72%', label: 'Belgian Cocoa' }
        ]
      },
      {
        id: 208,
        name: 'Microdose Focus Blend (Trinity Edition)',
        price: 44.99,
        image: main7,
        badge: 'COGNITIVE BOOST',
        rating: 4.9,
        category: 'MICRODOSE',
        specs: [
          { val: '120mg', label: 'Active Dose' },
          { val: '0g', label: 'Sugar' },
          { val: '30 Caps', label: 'Servings' }
        ]
      }
    ],
    'on-sale': [
      {
        id: 209,
        name: 'Golden Teacher Magic Mushrooms (AAA)',
        price: 39.99,
        originalPrice: 49.99,
        image: main5,
        badge: '20% OFF',
        rating: 5,
        category: 'PSYCHEDELICS',
        specs: [
          { val: '3.1g', label: 'Prebiotics' },
          { val: '0g', label: 'Sugar' },
          { val: '3.1g', label: 'Mushroom' }
        ]
      },
      {
        id: 210,
        name: 'Gourmet Psilocybin Belgian Dark Chocolate',
        price: 27.99,
        originalPrice: 34.99,
        image: main4,
        badge: '20% OFF',
        rating: 4.7,
        category: 'EDIBLES',
        specs: [
          { val: '3.1g', label: 'Prebiotics' },
          { val: '2g', label: 'Sugar' },
          { val: '72%', label: 'Belgian Cocoa' }
        ]
      },
      {
        id: 211,
        name: 'Premium Mind-Focus Microdose Caps',
        price: 31.99,
        originalPrice: 39.99,
        image: main7,
        badge: '20% OFF',
        rating: 4.8,
        category: 'MICRODOSE',
        specs: [
          { val: '150mg', label: 'Active Dose' },
          { val: '0g', label: 'Sugar' },
          { val: '30 Caps', label: 'Servings' }
        ]
      },
      {
        id: 212,
        name: 'Blue Meanie High-Potency Shrooms',
        price: 47.99,
        originalPrice: 59.99,
        image: main6,
        badge: '20% OFF',
        rating: 4.9,
        category: 'PSYCHEDELICS',
        specs: [
          { val: '4.5g', label: 'Prebiotics' },
          { val: '0g', label: 'Sugar' },
          { val: '4.5g', label: 'Mushroom' }
        ]
      }
    ]
  }

  // Framer Motion staggered transition variants for product tabs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.92,
      rotateX: 12,
      filter: 'blur(12px)'
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.10, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.94,
      rotateX: -8,
      filter: 'blur(6px)',
      transition: {
        duration: 0.3,
        ease: [0.10, 1, 0.3, 1]
      }
    }
  }

  const categories = [
    {
      name: 'MUSHROOMS',
      image: main5,
      desc: 'Organic whole-spore magic strains harvested under optimal laboratory parameters.',
      tag: 'DRIED RESERVE'
    },
    {
      name: 'MICRODOSE',
      image: main7,
      desc: 'Precision-dosed organic capsules to augment clarity, focus, and daily drive.',
      tag: 'COGNITIVE FOCUS'
    },
    {
      name: 'EDIBLES',
      image: main4,
      desc: 'Purified extract infusions combined with gourmet Belgian dark confectionery.',
      tag: 'INFUSED EXTRACT'
    }
  ]

  const offers = [
    {
      title: "Magic Mushroom",
      offerText: "20% OFF",
      subtitle: "Your Next Order",
      coupon: "SHROOM20",
      tag: "EXOTIC SPECIES",
      image: main5,
    },
    {
      title: "Microdose Capsules",
      offerText: "20% OFF",
      subtitle: "Your Next Order",
      coupon: "SHROOM20",
      tag: "COGNITIVE DRIFT",
      image: main7,
    },
    {
      title: "Mushroom Edibles",
      offerText: "15% OFF",
      subtitle: "On Your Next Order",
      coupon: "SHROOM15",
      tag: "GOURMET INFUSED",
      image: main4,
    },
  ]

  return (
    <>
      {/* Hero Showcase Section */}
      <Hero onShopNowClick={handleShopNowClick} />

      {/* WAVY DIVIDER 1: Hero (Dark) to Offers (Light) */}
      <div className="w-full overflow-hidden leading-[0] bg-[#161616] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[90px]">
          <path d="M0,80 C300,120 600,40 900,110 C1050,130 1150,90 1200,70 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.2" />
          <path d="M0,90 C250,110 550,60 850,115 C1000,130 1100,90 1200,75 L1200,120 L0,120 Z" fill="#00f2fe" opacity="0.15" />
          <path d="M0,100 C200,120 500,80 800,110 C950,120 1100,90 1200,80 L1200,120 L0,120 Z" fill="#f9fafb" />
        </svg>
      </div>

      {/* OFFERS SECTION */}
      <section className="w-full py-24 bg-[#f4f4f6] z-10 select-none relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FA0C83]/[0.04] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-400/[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 text-center"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#FA0C83] mb-3"
            >
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-[1.5px] bg-[#FA0C83] inline-block"
              />
              Exclusive Drops
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="h-[1.5px] bg-[#FA0C83] inline-block"
              />
            </motion.span>
            <h2 className="text-zinc-900 font-black text-3xl md:text-4xl uppercase tracking-tight">
              Premium Shroom Offers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, idx) => (
              <OfferCard
                key={idx}
                offer={offer}
                index={idx}
                handleShopNowClick={handleShopNowClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WAVY DIVIDER 2: Offers (Light) to Products (Dark) */}
      <div className="w-full overflow-hidden leading-[0] bg-[#f9fafb] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[90px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.2" />
          <path d="M0,70 C300,30 600,100 900,40 C1050,10 1120,50 1200,65 L1200,120 L0,120 Z" fill="#00f2fe" opacity="0.15" />
          <path d="M0,80 C250,40 550,90 850,50 C1000,30 1100,70 1200,60 L1200,120 L0,120 Z" fill="#161616" />
        </svg>
      </div>

      {/* SHOWROOM / PREMIUM SHROOM DROPS GRID (Dark Mode - Below Offers, Above Categories) */}
      <section className="w-full py-20 bg-[#161616] relative overflow-hidden z-10 select-none">

        {/* Subtle Cyberpunk Neon Particle Glows in Background */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#FA0C83]/5 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          {/* Section Heading */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
            <div>
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#01CBDF] mb-2"
              >
                <motion.span
                  animate={{ width: ['16px', '28px', '16px'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-[1.5px] bg-[#01CBDF] inline-block"
                />
                Premium Selection
                <motion.span
                  animate={{ width: ['16px', '28px', '16px'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="h-[1.5px] bg-[#01CBDF] inline-block"
                />
              </motion.span>
              <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight">
                Best Selling Magic Mushrooms
              </h2>
            </div>
            <button
              onClick={handleShopNowClick}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-[#FA0C83] text-xs font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer group"
            >
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              View Products
            </button>
          </div>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {tabShowroomProducts['best-selling'].map((product, idx) => (
              <ShowroomProductCard
                key={product.id}
                product={product}
                index={idx}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
                variants={cardVariants}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* WAVY DIVIDER 3: Products (Dark) to Categories (Light) */}
      <div className="w-full overflow-hidden leading-[0] bg-[#161616] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[90px]">
          <path d="M0,85 C200,50 450,110 750,50 C950,10 1100,70 1200,80 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.2" />
          <path d="M0,95 C180,60 400,100 700,45 C900,15 1080,60 1200,70 L1200,120 L0,120 Z" fill="#f97316" opacity="0.15" />
          <path d="M0,105 C150,70 350,90 650,40 C850,20 1050,50 1200,60 L1200,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* CATEGORY CARDS BLOCK (Light Mode - Below Products) */}
      <section className="w-full py-20 bg-white z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-200 pb-6 mb-12 text-center sm:text-left gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#FA0C83] mb-3"
              >
                <motion.span
                  animate={{ width: ['16px', '28px', '16px'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-[1.5px] bg-[#FA0C83] inline-block"
                />
                DISCOVER OUR CATALOG
                <motion.span
                  animate={{ width: ['16px', '28px', '16px'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="h-[1.5px] bg-[#FA0C83] inline-block"
                />
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-black font-display text-zinc-900 mt-2 tracking-tight">
                MUSHROOM CATEGORIES
              </h2>
            </div>
            <button
              onClick={handleShopNowClick}
              className="group px-6 py-2.5 bg-[#FA0C83] hover:bg-[#161616] border border-transparent hover:border-white/10 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#FA0C83]/15 flex items-center gap-1.5 cursor-pointer"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 3-Column Luxury Animated Category Grid with 3D Parallax Tilt Effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <CategoryCard
                key={idx}
                cat={cat}
                index={idx}
                handleShopNowClick={handleShopNowClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WAVY DIVIDER 4: Categories (Light) to Testimonials (Image) */}
      <div 
        className="w-full overflow-hidden leading-[0] pointer-events-none relative z-10 -mb-1"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(250, 12, 131, 0.85), rgba(1, 203, 223, 0.85)), url(${customerbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[90px]">
          <path d="M0,70 C300,30 650,110 900,50 C1050,20 1150,60 1200,75 L1200,0 L0,0 Z" fill="#ffffff" opacity="0.3" />
          <path d="M0,80 C250,40 600,100 850,40 C1000,10 1120,50 1200,65 L1200,0 L0,0 Z" fill="#ffffff" opacity="0.6" />
          <path d="M0,90 C200,50 500,90 800,50 C950,30 1100,70 1200,60 L1200,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* TESTIMONIALS SECTION (Redesigned matching image style with theme elements) */}
      <section
        className="w-full py-20 bg-transparent z-10 select-none relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(250, 12, 131, 0.85), rgba(1, 203, 223, 0.85)), url(${customerbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-20">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center pb-12 mb-5">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#01CBDF] mb-3"
            >
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-[1.5px] bg-[#01CBDF] inline-block"
              />
              Testimonials
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="h-[1.5px] bg-[#01CBDF] inline-block"
              />
            </motion.span>
            <h2 className="text-2xl md:text-3xl font-bold font-sans text-white tracking-wide uppercase">
              OUR CUSTOMER SAYS
            </h2>
          </div>

          {/* Testimonial Content */}
          <div className="max-w-4xl mx-auto relative min-h-[300px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col items-center text-center w-full"
              >
                <div className="flex items-start justify-center gap-2 mb-10 max-w-3xl px-4">
                  <span className="text-4xl text-white font-serif leading-none mt-1">“</span>
                  <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                    {reviews[activeReview].text}
                  </p>
                  <span className="text-4xl text-white font-serif leading-none mt-auto transform rotate-180 translate-y-2">“</span>
                </div>

                {/* Avatar */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-white/20 shadow-xl mb-4">
                  <img
                    src={reviews[activeReview].avatar}
                    alt={reviews[activeReview].name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name & Role */}
                <div className="flex items-center justify-center gap-2 text-white mb-2">
                  <h4 className="font-bold text-sm md:text-base">{reviews[activeReview].name}</h4>
                  <span className="text-white/80">-</span>
                  <span className="text-xs md:text-sm font-medium text-white/90">Customer</span>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(reviews[activeReview].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-4">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeReview === idx ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WAVY DIVIDER: Testimonials (Image) to Service Features (Light) */}
      <div 
        className="w-full overflow-hidden leading-[0] pointer-events-none relative z-10 -mb-2"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(250, 12, 131, 0.85), rgba(1, 203, 223, 0.85)), url(${customerbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[90px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.15" />
          <path d="M0,70 C300,30 600,100 900,40 C1050,10 1120,50 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.1" />
          <path d="M0,85 C250,50 550,95 850,55 C1000,35 1100,70 1200,65 L1200,120 L0,120 Z" fill="#f4f4f6" />
        </svg>
      </div>

      {/* SERVICE FEATURES BAR */}
      <section className="w-full py-12 bg-[#f4f4f6] z-10 select-none relative overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FA0C83]/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-[#01CBDF]/[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 text-center"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#FA0C83] mb-3"
            >
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-[1.5px] bg-[#FA0C83] inline-block"
              />
              Why Choose Us
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="h-[1.5px] bg-[#FA0C83] inline-block"
              />
            </motion.span>
            <h2 className="text-zinc-900 font-black text-3xl md:text-5xl uppercase tracking-tight">
              Core Highlights
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm mt-3 max-w-md mx-auto">
              Our commitment to delivering a premium, secure, and laboratory-grade experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => {
              const featColor = idx % 2 === 0 ? '#FA0C83' : '#01CBDF'
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10 }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
                  }}
                  className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/80 p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-500 overflow-hidden cursor-default shadow-lg hover:shadow-2xl hover:border-transparent"
                >
                  {/* Spotlight Cursor Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${featColor}18, transparent 80%)` }}
                  />

                  {/* Top neon strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${featColor}, transparent)` }}
                  />

                  {/* Floating particle background glow on hover */}
                  <div
                    className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"
                    style={{ backgroundColor: featColor }}
                  />

                  {/* Icon Container with glowing ring */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-all duration-300 border"
                    style={{
                      background: `linear-gradient(135deg, ${featColor}0e, ${featColor}1a)`,
                      borderColor: `${featColor}24`,
                      color: featColor,
                      boxShadow: `0 8px 24px -8px ${featColor}24`
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex items-center justify-center"
                    >
                      <feat.icon className="w-7 h-7" />
                    </motion.div>

                    {/* Ring glow behind icon on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-all duration-300 pointer-events-none"
                      style={{ backgroundColor: featColor }}
                    />
                  </div>

                  {/* Micro-Highlight stat tag */}
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block relative z-10 border transition-all duration-300"
                    style={{
                      color: featColor,
                      backgroundColor: `${featColor}08`,
                      borderColor: `${featColor}15`
                    }}
                  >
                    {feat.stat}
                  </span>

                  <h4 className="font-black text-sm text-white uppercase tracking-wider mb-2.5 relative z-10 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-semibold leading-relaxed relative z-10 max-w-[200px]">
                    {feat.desc}
                  </p>

                  {/* Bottom animated bar */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[3px] rounded-t-full transition-all duration-500"
                    style={{ backgroundColor: featColor }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WAVY DIVIDER 5: Service Features (Light) to Blog (Dark) */}
      <div className="w-full overflow-hidden leading-[0] bg-[#f4f4f6] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[90px]">
          <path d="M0,70 C300,30 650,110 900,50 C1050,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.1" />
          <path d="M0,80 C250,40 600,100 850,40 C1000,10 1120,50 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.08" />
          <path d="M0,90 C200,50 500,90 800,50 C950,30 1100,70 1200,60 L1200,120 L0,120 Z" fill="#111113" />
        </svg>
      </div>

      {/* LATEST NEWS / BLOG SECTION (Dark Mode Slider) */}
      <section className="w-full py-12 bg-[#111113] z-10 select-none relative overflow-hidden">
        {/* Subtle bg texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FA0C83]/[0.05] blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-800/80 pb-8 mb-8 gap-4"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#FA0C83] mb-2"
              >
                <motion.span
                  animate={{ width: ['16px', '28px', '16px'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-[1.5px] bg-[#FA0C83] inline-block"
                />
                Shroom Knowledge
                <motion.span
                  animate={{ width: ['16px', '28px', '16px'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="h-[1.5px] bg-[#FA0C83] inline-block"
                />
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Latest News & Blogs</h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => alert('Redirecting to blog pages...')}
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#FA0C83] text-zinc-900 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-colors duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(250,12,131,0.3)]"
            >
              Read All Articles <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>

          {/* Sliding Blog Cards Container with 3D Slider perspective */}
          <div className="relative px-4 sm:px-10">

            <div
              style={{ perspective: 1200 }}
              className="relative w-full h-[500px] flex items-center justify-center overflow-visible select-none mt-4"
            >
              {blogPosts.map((post, idx) => {
                const originalIdx = idx
                // Calculate circular distance from activeBlog
                let diff = idx - activeBlog
                if (diff < -blogPosts.length / 2) diff += blogPosts.length
                if (diff > blogPosts.length / 2) diff -= blogPosts.length

                // Determine dynamic positioning coordinates based on screen size
                const isMobile = windowWidth < 640
                const isTablet = windowWidth >= 640 && windowWidth < 1024

                const stepX = isMobile ? 120 : isTablet ? 220 : 340

                let xOffset = diff * stepX
                let zOffset = -150
                let rotateY = diff === 0 ? 0 : diff < 0 ? 45 : -45
                let scale = 0.88
                let opacity = 0
                let zIndex = 10
                let pointerEvents = 'none'

                if (diff === 0) {
                  zOffset = 100
                  rotateY = 0
                  scale = 1.05
                  opacity = 1
                  zIndex = 30
                  pointerEvents = 'auto'
                } else if (diff === -1 || diff === 1) {
                  zOffset = -50
                  opacity = isMobile ? 0.25 : 0.8
                  zIndex = 20
                  pointerEvents = 'auto'
                } else {
                  // Keep far/opposite cards completely invisible to avoid visible boundary jumps
                  zOffset = -250
                  opacity = 0
                  zIndex = 5
                  pointerEvents = 'none'
                }

                const accentColor = originalIdx % 2 === 0 ? '#FA0C83' : '#01CBDF'
                const avatarColors = ['#FA0C83', '#01CBDF', '#f9362d']
                const avatarInitials = post.author.split(' ').map(w => w[0]).join('').slice(0, 2)

                return (
                  <motion.div
                    key={post.title}
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: diff === 0 ? '0 25px 60px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)',
                      pointerEvents: pointerEvents
                    }}
                    animate={{
                      x: xOffset,
                      z: zOffset,
                      rotateY: rotateY,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex
                    }}
                    transition={{
                      duration: 1.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={diff === 0 ? { y: -10 } : {}}
                    onClick={() => {
                      if (diff !== 0) {
                        setBlogDirection(diff > 0 ? 1 : -1)
                        setActiveBlog(originalIdx)
                      }
                    }}
                    className="absolute w-[290px] sm:w-[330px] md:w-[350px] bg-white border border-zinc-100 rounded-3xl overflow-hidden flex flex-col cursor-pointer transition-colors duration-300 hover:border-zinc-200"
                  >
                    {/* Image */}
                    <div className="relative h-44 sm:h-48 overflow-hidden select-none pointer-events-none">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Tag */}
                      <span
                        className="absolute top-4 left-4 text-[9px] font-black text-white px-3 py-1.5 rounded-full uppercase tracking-widest"
                        style={{ background: accentColor }}
                      >
                        {post.tag}
                      </span>
                      {/* Animated top border */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.5 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                        <Calendar className="w-3 h-3" style={{ color: accentColor }} />
                        {post.date}
                      </div>

                      {/* Title */}
                      <h3 className="font-black text-sm sm:text-base text-zinc-900 leading-snug mb-2.5 group-hover:text-[#FA0C83] transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Desc */}
                      <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed mb-4 flex-1 line-clamp-2 sm:line-clamp-none">{post.desc}</p>

                      {/* Author row + CTA */}
                      <div className="flex items-center justify-between pt-3.5 border-t border-zinc-100">
                        {/* Author with avatar */}
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${accentColor}, ${avatarColors[(originalIdx + 1) % 3]})` }}
                          >
                            {avatarInitials}
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-zinc-900 uppercase tracking-wide leading-tight">{post.author}</p>
                            <p className="text-[8px] text-zinc-500 font-semibold leading-tight">Author</p>
                          </div>
                        </div>
                        {/* Read more */}
                        <motion.span
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest transition-colors duration-300"
                          style={{ color: accentColor }}
                        >
                          Read <ArrowRight className="w-3 h-3" />
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Central Navigation Controls Dock */}
            <div className="flex items-center justify-center gap-6 mt-6 relative z-50">
              <button
                onClick={() => {
                  setBlogDirection(-1)
                  setActiveBlog((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1))
                  setBlogTimerKey((k) => k + 1)
                }}
                className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div className="flex gap-1.5 items-center">
                {blogPosts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setBlogDirection(i > activeBlog ? 1 : -1)
                      setActiveBlog(i)
                      setBlogTimerKey((k) => k + 1)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeBlog ? 'w-6 bg-[#FA0C83]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setBlogDirection(1)
                  setActiveBlog((prev) => (prev + 1) % blogPosts.length)
                  setBlogTimerKey((k) => k + 1)
                }}
                className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WAVY DIVIDER: Blog (Dark) to Service Areas (Light) */}
      <div className="w-full overflow-hidden leading-[0] bg-[#111113] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.12" />
          <path d="M0,75 C300,35 600,100 900,45 C1050,15 1120,55 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.1" />
          <path d="M0,88 C250,55 550,95 850,55 C1000,35 1100,70 1200,62 L1200,120 L0,120 Z" fill="#fafafa" />
        </svg>
      </div>

      {/* LOCATIONS / SERVICE AREAS SECTION */}
      <section className="w-full py-12 bg-[#fafafa] z-10 relative overflow-hidden">
        <div className="absolute top-1/4 left-[5%] w-[400px] h-[400px] rounded-full bg-[#FA0C83]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] rounded-full bg-[#01CBDF]/5 blur-[120px] pointer-events-none" />

        {/* Abstract Map Nodes Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.8) 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#FA0C83] mb-3"
            >
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-[1.5px] bg-[#FA0C83] inline-block"
              />
              Service Areas
              <motion.span
                animate={{ width: ['16px', '28px', '16px'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="h-[1.5px] bg-[#FA0C83] inline-block"
              />
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight">Where We Provide Services</h2>
            <p className="text-zinc-500 text-sm md:text-base mt-4 max-w-lg mx-auto">
              We bring the highest quality mushroom products directly to your doorstep. Currently serving major metropolitan areas and expanding rapidly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'Vancouver', province: 'British Columbia', status: 'Same-Day Delivery' },
              { city: 'Toronto', province: 'Ontario', status: '2-Day Shipping' },
              { city: 'Montreal', province: 'Quebec', status: '2-Day Shipping' },
              { city: 'Calgary', province: 'Alberta', status: 'Express Delivery' },
            ].map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white border border-zinc-100 p-6 rounded-3xl overflow-hidden hover:border-[#FA0C83]/30 hover:shadow-xl transition-all duration-300 cursor-default"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FA0C83]/0 to-[#01CBDF]/0 group-hover:from-[#FA0C83]/5 group-hover:to-[#01CBDF]/5 transition-colors duration-500" />

                <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_25px_rgba(250,12,131,0.15)] group-hover:border-[#FA0C83]/20">
                  <MapPin className="w-5 h-5 text-[#FA0C83]" />
                </div>

                <h3 className="text-xl font-black text-zinc-900 uppercase tracking-wider mb-1">{loc.city}</h3>
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-5">{loc.province}</p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#01CBDF]/10 border border-[#01CBDF]/20 text-[#01CBDF] text-[9px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01CBDF] animate-pulse" />
                  {loc.status}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center">
            <p className="text-zinc-500 text-xs mb-4 uppercase tracking-widest font-semibold">Not in these areas?</p>
            <motion.button
              onClick={() => setIsShippingModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full bg-zinc-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#01CBDF] transition-colors duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(1,203,223,0.3)] cursor-pointer"
            >
              Check Nationwide Shipping
            </motion.button>
          </div>
        </div>
      </section>
      <ShippingModal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
      />
    </>
  )
}
