import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, ZoomIn, ShoppingCart, Minus, Plus } from 'lucide-react';

export default function ProductCard({ product, handleAddToCart, handleAddToWishlist, variants }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(0)
  const [glowY, setGlowY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [qty, setQty] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('3.5g')
  const weightVariants = ['3.5g', '7g', '14g', '28g']

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotateX(-y * 12)
    setRotateY(x * 12)
    setGlowX(e.clientX - rect.left)
    setGlowY(e.clientY - rect.top)
  }

  const handleMouseEnter = () => setIsHovered(true)
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
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        animate={{ rotateX: rotateX, rotateY: rotateY, y: isHovered ? -8 : 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18, mass: 0.5 }}
        className="bg-black backdrop-blur-sm border border-zinc-500 rounded-xl p-4 flex flex-col relative group cursor-pointer hover:shadow-[0_20px_45px_rgba(250,12,131,0.22)] hover:border-[#FA0C83] transition-all duration-300 overflow-hidden h-full w-full"
      >
        <div className={`absolute inset-0 bg-white rounded-xl z-0 pointer-events-none transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'}`} />
        
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-20">
          <div style={{ background: `radial-gradient(180px circle at ${glowX}px ${glowY}px, rgba(249, 54, 45, 0.08), transparent 85%)`, opacity: isHovered ? 1 : 0 }} className="absolute inset-0 transition-opacity duration-300 pointer-events-none" />
          <div style={{ background: `radial-gradient(circle at ${glowX}px ${glowY}px, rgba(255, 255, 255, 0.15) 0%, rgba(0, 240, 255, 0.08) 30%, rgba(255, 0, 128, 0.08) 60%, transparent 80%)`, mixBlendMode: 'color-dodge', opacity: isHovered ? 1 : 0 }} className="absolute inset-0 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute inset-0 w-[200%] h-full pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] z-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: Math.random() * 200 + 40, y: 350, opacity: 0, scale: Math.random() * 0.4 + 0.6 }}
                animate={{ y: [-20, -120 - Math.random() * 150], x: [null, Math.random() * 60 - 30], opacity: [0, 0.8, 0] }}
                transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FA0C83] to-amber-400 blur-[1px] shadow-[0_0_8px_#FA0C83]"
              />
            ))}
          </div>
        )}

        <div className="w-full aspect-[4/4] relative flex items-center justify-center flex-shrink-0 z-10 mb-5 select-none">
          <motion.div
            animate={{ opacity: isHovered ? 0.85 : 0, scale: isHovered ? 1.15 : 0.8, rotate: isHovered ? 360 : 0 }}
            transition={{ opacity: { duration: 0.4 }, scale: { type: 'spring', stiffness: 80, damping: 15 }, rotate: { repeat: Infinity, duration: 10, ease: "linear" } }}
            className="absolute w-[95%] h-[95%] rounded-full bg-gradient-to-tr from-[#FA0C83]/30 via-purple-600/20 to-cyan-500/10 blur-[20px] pointer-events-none"
          />
          <div className="absolute inset-0 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-2xl flex items-center justify-center z-10 group/image">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50 z-10 pointer-events-none" />
            <motion.img
              src={product.image}
              alt={product.name}
              className={`w-[100%] h-[100%] object-cover transition-all duration-300 ${isHovered ? 'filter blur-[3px] brightness-[0.6]' : 'filter brightness-[0.88]'}`}
            />
            {product.badge && (
              <span className="absolute top-3.5 left-3.5 text-[8px] font-black text-white bg-[#FA0C83] py-1 px-3 rounded-full uppercase tracking-wider shadow-md z-20">
                {product.badge}
              </span>
            )}
            <div className={`absolute inset-0 bg-black/50 backdrop-blur-[2.5px] transition-all duration-300 flex items-center justify-center z-20 ${isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              <button
                onClick={(e) => { e.stopPropagation(); if (handleAddToCart) handleAddToCart(product); }}
                className={`bg-white hover:bg-[#FA0C83] hover:text-white text-[#161616] font-display font-black text-[10px] py-2.5 px-5.5 rounded-xl shadow-lg transition-all duration-300 transform cursor-pointer ${isHovered ? 'translate-y-0' : 'translate-y-3'}`}
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-3.5 z-10" style={{ transform: 'translateZ(25px)' }}>
          <div className="space-y-1 mb-1">
            <span className={`text-[10px] font-medium uppercase tracking-wider font-sans block transition-colors duration-300 ${isHovered ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {product.category}
            </span>
            <h3 className={`font-sans font-sem  ibold text-sm md:text-[15px] group-hover:text-[#FA0C83] transition-colors duration-300 line-clamp-1 leading-snug ${isHovered ? 'text-zinc-900' : 'text-zinc-100'}`}>
              {product.name}
            </h3>

            {/* Weight Variants */}
            <div className="flex items-center gap-1.5 pt-3 pb-1 z-20" style={{ transform: 'translateZ(20px)' }}>
              {weightVariants.map((weight) => (
                <button
                  key={weight}
                  onClick={(e) => { e.stopPropagation(); setSelectedVariant(weight); }}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors shadow-sm ${selectedVariant === weight ? 'bg-[#FA0C83] text-white border-[#FA0C83]' : (isHovered ? 'bg-transparent text-zinc-900 border-zinc-300 hover:border-[#FA0C83]' : 'bg-transparent text-white border-zinc-700 hover:text-white hover:border-zinc-500')}`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-1 z-20" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex flex-col">
              <span className={`text-sm md:text-base font-bold font-sans transition-colors duration-300 ${isHovered ? 'text-zinc-900' : 'text-white'}`}>
                ${((product.price || 0) * qty).toFixed(2)}
              </span>
            </div>

            <div className={`flex items-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-100'}`}>
              <div className={`flex items-center border rounded-lg overflow-hidden h-8 shadow-sm transition-colors ${isHovered ? 'bg-white border-zinc-200' : 'bg-zinc-900/50 border-zinc-700'}`}>
                <button 
                  onClick={(e) => { e.stopPropagation(); setQty(q => Math.max(1, q - 1)); }}
                  className={`w-7 h-full flex items-center justify-center transition-colors ${isHovered ? 'text-zinc-500 hover:bg-zinc-50' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className={`text-xs font-bold w-4 text-center select-none ${isHovered ? 'text-zinc-900' : 'text-zinc-300'}`}>{qty}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setQty(q => q + 1); }}
                  className={`w-7 h-full flex items-center justify-center transition-colors ${isHovered ? 'text-zinc-500 hover:bg-zinc-50' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 
          <div className={`flex items-center gap-2 pt-2 border-t transition-colors duration-300 ${isHovered ? 'border-zinc-200' : 'border-zinc-800/40'}`}>
            <button
              onClick={(e) => { e.stopPropagation(); if (handleAddToCart) handleAddToCart(product); }}
              className="bg-[#FA0C83] hover:bg-[#01CBDF] text-white font-sans font-bold text-[10px] md:text-xs py-2 px-3 rounded-md transition-colors flex-1 text-center cursor-pointer uppercase tracking-wider flex items-center justify-center"
            >
              SELECT OPTIONS
            </button>
            <button onClick={(e) => { e.stopPropagation(); }} className={`w-[38px] h-[38px] border rounded-md flex items-center justify-center transition-all cursor-pointer ${isHovered ? 'border-zinc-200 text-zinc-500 hover:text-white hover:bg-zinc-900 hover:border-zinc-900' : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); }} className={`w-[38px] h-[38px] border rounded-md flex items-center justify-center transition-all cursor-pointer ${isHovered ? 'border-zinc-200 text-zinc-500 hover:text-white hover:bg-zinc-900 hover:border-zinc-900' : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
              <ZoomIn className="w-4 h-4" />
            </button>
          </div> 
          */}
        </div>
      </motion.div>
    </motion.div>
  )
}
