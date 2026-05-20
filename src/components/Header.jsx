import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search, Heart, ShoppingBag, User, ChevronDown,
  X, Flame, Tag, Clock, ArrowRight, CornerDownRight, Store
} from 'lucide-react'
import MushroomLogo from './MushroomLogo'
import funguyzLogo from '../assets/images/funguyzlogo.png'

export default function Header({
  onOpenCart,
  onOpenLogin,
  cartCount,
  wishlistCount,
  cartSubtotal
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  // Search Overlay State
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Category Shelf state
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        document.getElementById('full-search-input')?.focus()
      }, 300)
    }
  }, [isSearchOpen])

  const navItems = [
    { id: 'shop', label: 'SHOP', hasDropdown: true },
    { id: 'on-sale', label: 'ON SALE', hasDropdown: false },
    { id: 'bundles', label: 'BUNDLES', hasDropdown: false }
  ]

  const trendingSearches = ['Mushroom Utility Jacket', 'Oversized Logo Tee', 'Crimson Crew Socks', 'Sling Canvas Bag']

  const searchResults = [
    { id: 1, name: 'Retro Oversized Hoodie', price: '$79.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=150' },
    { id: 2, name: 'Mushroom Graphic Hoodie', price: '$85.00', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=150' },
    { id: 3, name: 'Technical Cargo Runner Pants', price: '$110.00', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=150' }
  ]

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Decide if dock is in Shrunk or Expanded state
  // Once scrolled or on mobile, header stays compact
  const isCompact = isScrolled || windowWidth < 768

  return (
    <>
      {/* Dynamic Floating Navbar Dock */}
      <div
        className="fixed left-0 right-0 top-12 flex justify-center z-50 px-4 select-none font-sans"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsCategoryOpen(false)
          setHoveredLink(null)
        }}
      >
        <motion.div
          layout
          className={`flex items-center justify-between bg-zinc-700/95 backdrop-blur-lg border border-white/20 shadow-2xl relative transition-all duration-300 ${isCompact
            ? 'w-full max-w-[420px] px-5 py-2 rounded-full'
            : 'w-full max-w-7xl px-8 py-1 rounded-[2rem]'
            }`}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        >
          {isCompact ? (
            <>
              {/* COMPACT LEFT: Search, Heart */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90"
                >
                  <Search className="w-4.5 h-4.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-md transition-all cursor-pointer text-white/90 group"
                >
                  <Heart className="w-4.5 h-4.5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white group-hover:bg-white group-hover:text-brand-red transition-colors rounded-full flex items-center justify-center text-[9px] font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </motion.button>
              </div>

              {/* COMPACT CENTER: Logo (Absolute) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link to="/" className="cursor-pointer block">
                  <img
                    src={funguyzLogo}
                    alt="Funguyz Logo"
                    className="w-auto object-contain transition-all duration-300"
                    style={{
                      height: '47px',
                      marginTop: '-7px',
                      marginBottom: '-8px'
                    }}
                  />
                </Link>
              </div>

              {/* COMPACT RIGHT: Shop, Cart */}
              <div className="flex items-center gap-3">
                <motion.a
                  href="/#shop"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90"
                >
                  <Store className="w-4.5 h-4.5" />
                </motion.a>
                <motion.button
                  onClick={onOpenCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-lg transition-all cursor-pointer text-white group"
                >
                  <ShoppingBag className="w-4.5 h-4.5 opacity-80" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white group-hover:bg-white group-hover:text-brand-red transition-colors rounded-full flex items-center justify-center text-[9px] font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </>
          ) : (
            <>
              {/* EXPANDED LEFT: Logo */}
              <Link to="/" className="cursor-pointer">
                <img
                  src={funguyzLogo}
                  alt="Funguyz Logo"
                  className="w-auto object-contain transition-all duration-300"
                  style={{
                    height: '73px',
                    marginTop: '-11px',
                    marginBottom: '-12px',
                    marginLeft: '-6px',
                    marginRight: '-5px'
                  }}
                />
              </Link>

              {/* EXPANDED CENTER: Navigation Links */}
              <nav className="flex items-center gap-2 relative">
                {navItems.map((item) => {
                  const isActiveLink = hoveredLink === item.id;
                  return (
                    <div
                      key={item.id}
                      className="relative px-4 py-2 cursor-pointer rounded-full"
                      onMouseEnter={() => {
                        setHoveredLink(item.id)
                        if (item.hasDropdown) {
                          setIsCategoryOpen(true)
                        } else {
                          setIsCategoryOpen(false)
                        }
                      }}
                    >
                      {isActiveLink && (
                        <motion.span
                          layoutId="navBlob"
                          className="absolute inset-0 bg-brand-red rounded-full z-0"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                      <a
                        href={`/#${item.id}`}
                        className={`relative z-10 flex items-center gap-1 font-display font-extrabold text-[13px] tracking-widest transition-colors duration-200 ${isActiveLink ? 'text-white' : 'text-white/80'
                          }`}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isActiveLink ? 'rotate-180 text-white' : 'text-white/60'
                          }`} />}
                      </a>
                    </div>
                  );
                })}
              </nav>

              {/* EXPANDED RIGHT: Utility Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90"
                >
                  <Search className="w-4.5 h-4.5" />
                </motion.button>
                <motion.button
                  onClick={onOpenLogin}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90"
                >
                  <User className="w-4.5 h-4.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-md transition-all cursor-pointer text-white/90 group"
                >
                  <Heart className="w-4.5 h-4.5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white group-hover:bg-white group-hover:text-brand-red transition-colors rounded-full flex items-center justify-center text-[9px] font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </motion.button>
                <motion.button
                  onClick={onOpenCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-md transition-all cursor-pointer text-white/90 group"
                >
                  <div className="relative">
                    <ShoppingBag className="w-4.5 h-4.5 opacity-80" />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-2.5 w-4 h-4 bg-brand-red text-white group-hover:bg-white group-hover:text-brand-red transition-colors rounded-full flex items-center justify-center text-[9px] font-black"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
                  <span className="text-xs font-black tracking-tight">
                    {/* ${cartSubtotal.toFixed(2)} */}
                  </span>
                </motion.button>
              </div>
            </>
          )}

          {/* 4. FLOATING CATEGORY DROP SHELF */}
          <AnimatePresence>
            {isCategoryOpen && !isCompact && (
              <motion.div
                className="absolute left-0 right-0 top-full pt-4 z-40"
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 grid grid-cols-4 gap-8 overflow-hidden">
                  {hoveredLink === 'shop' && (
                    <>
                      {/* Col 1: Tops */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest">Mushrooms</h3>
                        <ul className="space-y-2">
                          {['Magic Mushrooms', 'Freeze Dried Mushrooms', 'Shroom Capsules', 'Shroom Gummies'].map((link) => (
                            <li key={link} className="flex items-center gap-1.5 group">
                              <CornerDownRight className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-red transition-colors" />
                              <a href="/#shop" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: Bottoms */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest">Edibles</h3>
                        <ul className="space-y-2">
                          {['Shroom Chocolates', 'Shroom Tea', 'Shroom Syrup', 'Shroom Aid'].map((link) => (
                            <li key={link} className="flex items-center gap-1.5 group">
                              <CornerDownRight className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-red transition-colors" />
                              <a href="/#shop" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: Accessories */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest">Extras</h3>
                        <ul className="space-y-2">
                          {['DMT Vape', 'LSD', 'Merch', 'Connoisseur Box'].map((link) => (
                            <li key={link} className="flex items-center gap-1.5 group">
                              <CornerDownRight className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-red transition-colors" />
                              <a href="/#shop" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}



                  {/* Col 4: Hot Flyer Card */}
                  <div className="bg-[#09090b] text-white rounded-3xl p-5 border border-zinc-800 relative overflow-hidden flex flex-col justify-between h-[180px] group">
                    <div className="absolute right-[-30px] top-[-30px] w-24 h-24 bg-brand-red/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div>
                      <span className="text-[8px] font-black bg-brand-red px-2 py-0.5 rounded-full tracking-widest">HOT COMBO</span>
                      <h4 className="font-display font-black text-sm mt-3 leading-tight">FREE SOCKS WITH<br />MUSHROOM CAP DROP</h4>
                    </div>
                    <a href="/#shop" className="text-[10px] font-black text-brand-red hover:text-white flex items-center gap-1">
                      <span>REDEEM OFFER</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 5. FULL SCREEN MINIMALIST SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#09090b]/98 backdrop-blur-2xl flex flex-col p-6 md:p-16 justify-between select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay Header */}
            <div className="w-full flex justify-between items-center max-w-6xl mx-auto">
              <span className="text-[10px] font-black text-brand-red tracking-widest flex items-center gap-1.5">
                <Flame className="w-4 h-4 animate-bounce" />
                <span>SEARCHING THE DROPS</span>
              </span>

              <button
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery('')
                }}
                className="p-3 border border-zinc-800 hover:border-brand-red rounded-full text-zinc-400 hover:text-white hover:rotate-90 transition-all duration-300 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Massive Search Input and Neon Highlight */}
            <div className="w-full max-w-4xl mx-auto flex flex-col space-y-6">
              <div className="relative group border-b-4 border-zinc-800 focus-within:border-brand-red transition-colors duration-300">
                <input
                  id="full-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="TYPE WHAT YOU SEEK..."
                  className="w-full py-6 bg-transparent text-3xl md:text-6xl font-display font-black tracking-tight text-white placeholder-zinc-800 uppercase outline-none"
                />

                {/* Glowing neon shadow below input on focus */}
                <div className="absolute left-0 right-0 bottom-[-4px] h-[4px] bg-brand-red blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Suggestions / Results container */}
              <div className="pt-6">

                {/* Left col: Trend list */}
                <div className="space-y-5 max-w-xl">
                  <h4 className="text-xs font-black text-zinc-600 tracking-widest flex items-center gap-1.5 uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Trending Searches</span>
                  </h4>
                  <ul className="space-y-3">
                    {trendingSearches.map((term, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setSearchQuery(term)}
                          className="text-sm md:text-lg font-black text-zinc-400 hover:text-brand-red hover:translate-x-1.5 transition-all text-left"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Overlay Footer */}
            <div className="w-full max-w-6xl mx-auto flex justify-between items-center text-[10px] font-bold text-zinc-600 tracking-widest border-t border-zinc-900/60 pt-6">
              <span>© 2026 FUN GUYZ CREATIVE DEP.</span>
              <a href="#help" className="hover:text-white transition-colors">NEED CUSTOM FIT? CHAT NOW</a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
