import React from 'react'
import { motion } from 'framer-motion'

export default function MushroomLogo({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-6 text-xl',
    md: 'h-8 text-2xl md:text-3xl',
    lg: 'h-12 text-4xl md:text-5xl',
  }

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 md:w-9 md:h-9',
    lg: 'w-12 h-12 md:w-14 md:h-14',
  }

  return (
    <motion.div 
      className={`flex items-center gap-1.5 font-display font-black tracking-tight text-brand-dark cursor-pointer select-none ${sizeClasses[size]} ${className}`}
      whileHover="hover"
    >
      <span>FUN</span>
      
      <motion.svg
        className={`${iconSizes[size]} fill-none inline-block`}
        viewBox="0 0 120 120"
        variants={{
          hover: { 
            scale: 1.15,
            rotate: [0, -10, 10, -5, 5, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      >
        {/* Tan Stem */}
        <path
          d="M48 68 C 48 95, 72 95, 72 68"
          fill="#f3e8d3"
          stroke="#09090b"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Red Cap */}
        <path
          d="M20 68 C 10 68, 10 25, 60 25 C 110 25, 110 68, 100 68 Z"
          fill="#FA0C83"
          stroke="#09090b"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cap Bottom Rim Line */}
        <path
          d="M20 68 C 40 72, 80 72, 100 68"
          stroke="#09090b"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* White Spot Left */}
        <circle cx="42" cy="42" r="9" fill="#ffffff" stroke="#09090b" strokeWidth="3" />
        
        {/* White Spot Center/Top */}
        <circle cx="60" cy="34" r="8" fill="#ffffff" stroke="#09090b" strokeWidth="3" />
        
        {/* White Spot Right */}
        <circle cx="78" cy="46" r="10" fill="#ffffff" stroke="#09090b" strokeWidth="3" />
        
        {/* Little White Spot Bottom Left */}
        <circle cx="32" cy="58" r="5" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
        
        {/* Little White Spot Bottom Right */}
        <circle cx="88" cy="58" r="6" fill="#ffffff" stroke="#09090b" strokeWidth="2" />

        {/* Stem Face (Cute details) */}
        <circle cx="55" cy="80" r="3" fill="#09090b" />
        <circle cx="65" cy="80" r="3" fill="#09090b" />
      </motion.svg>

      <span className="text-brand-red font-extrabold">GUYZ</span>
    </motion.div>
  )
}
