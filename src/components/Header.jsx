import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search, Heart, ShoppingBag, User, ChevronDown,
  X, Flame, Tag, Clock, ArrowRight, CornerDownRight, Store, Menu,
  Settings, FileText, HelpCircle, LogOut, Activity, MessageSquare,
  Package, MessageCircle
} from 'lucide-react'
// import MushroomLogo from './MushroomLogo'
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

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Prevent background scrolling when overlays are open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isSearchOpen]);

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
  const isMobile = windowWidth < 768
  const isCompact = isScrolled || isMobile

  return (
    <>
      <div
        className={`fixed left-0 right-0 flex justify-center select-none font-sans transition-all duration-300 z-[50] ${
          isScrolled ? (isMobile ? 'top-0' : 'top-2 px-3') : (isMobile ? 'top-[37px]' : 'top-12 px-4')
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsCategoryOpen(false)
          setHoveredLink(null)
        }}
      >
        <motion.div
          layout
          className={`flex items-center justify-between bg-zinc-700/95 backdrop-blur-lg shadow-2xl relative transition-all duration-300 ${
            isMobile
              ? 'w-full px-4 py-2 border-b border-white/20'
              : isCompact
                ? 'w-full max-w-[420px] px-5 py-2 rounded-full border border-white/20'
                : 'w-full max-w-7xl px-8 py-1 rounded-[2rem] border border-white/20'
          }`}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        >
          {isMobile ? (
            <>
              {/* MOBILE LEFT: Menu, Search */}
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 sm:p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90"
                >
                  <Menu className="w-4.5 h-4.5" />
                </motion.button>
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 sm:p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90 flex"
                >
                  <Search className="w-4.5 h-4.5" />
                </motion.button>
              </div>

              {/* MOBILE CENTER: Logo (Absolute) */}
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

              {/* MOBILE RIGHT: Wishlist & Cart */}
              <div className="flex items-center gap-2 sm:gap-3">
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
                  className="relative p-2 sm:p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-lg transition-all cursor-pointer text-white group"
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
          ) : isCompact ? (
            <>
              {/* COMPACT LEFT: Menu, Search */}
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 sm:p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90"
                >
                  <Menu className="w-4.5 h-4.5" />
                </motion.button>
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 sm:p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90 hidden sm:flex"
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
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/productlist"
                  className="p-2 sm:p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer text-white/90"
                >
                  <Store className="w-4.5 h-4.5" />
                </Link>
                <motion.button
                  onClick={onOpenCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 sm:p-2.5 rounded-full border border-white/10 bg-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-lg transition-all cursor-pointer text-white group"
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
                      <Link
                        to={item.id === 'shop' ? '/productlist' : `/#${item.id}`}
                        className={`relative z-10 flex items-center gap-1 font-display font-extrabold text-[13px] tracking-widest transition-colors duration-200 ${isActiveLink ? 'text-white' : 'text-white/80'
                          }`}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isActiveLink ? 'rotate-180 text-white' : 'text-white/60'
                          }`} />}
                      </Link>
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
                <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 overflow-y-auto max-h-[80vh]">
                  {hoveredLink === 'shop' && (
                    <>
                      {/* Col 1: Magic Mushrooms */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest">Magic Mushrooms</h3>
                        <ul className="space-y-1">
                          {['Beginner Friendly', 'Creative Boost', 'Relax & Chill', 'Focus & Clarity', 'Happy & Euphoric', 'Visual Experience', 'Deep Journey', 'Elevated Experience'].map((link) => (
                            <li key={link} className="flex items-center gap-1.5 group">
                              <CornerDownRight className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-red transition-colors" />
                              <Link to="/productlist" className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: Microdose */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest">Microdose</h3>
                        <ul className="space-y-1">
                          {['Focus & Clarity', 'Daily Wellness', 'Creative Boost', 'Mood Support', 'Energy Boost', 'Stress Relief', 'Beginner Friendly', 'Balanced Mind'].map((link) => (
                            <li key={link} className="flex items-center gap-1.5 group">
                              <CornerDownRight className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-red transition-colors" />
                              <Link to="/productlist" className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: Edibles */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest">Edibles</h3>
                        <ul className="space-y-1">
                          {['Happy & Euphoric', 'Relax & Chill', 'Creative Boost', 'Visual Experience', 'Smooth Journey', 'Social Vibes', 'Beginner Friendly', 'Elevated Experience'].map((link) => (
                            <li key={link} className="flex items-center gap-1.5 group">
                              <CornerDownRight className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-red transition-colors" />
                              <Link to="/productlist" className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 4: Capsules */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest">Capsules</h3>
                        <ul className="space-y-1">
                          {['Focus & Clarity', 'Daily Wellness', 'Relax & Chill', 'Energy Boost', 'Balanced Mind', 'Mood Support', 'Beginner Friendly', 'Creative Boost'].map((link) => (
                            <li key={link} className="flex items-center gap-1.5 group">
                              <CornerDownRight className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-red transition-colors" />
                              <Link to="/productlist" className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors">
                                {link}
                              </Link>
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
                      <span className="text-[8px] font-black bg-brand-red px-2 py-0.5 rounded-full tracking-widest">NEW ARRIVAL</span>
                      <h4 className="font-display font-black text-sm mt-3 leading-tight">TRY THE NEW UTOPIA<br />PREMIUM GUMMIES</h4>
                    </div>
                    <Link to="/productlist" className="text-[10px] font-black text-brand-red hover:text-white flex items-center gap-1">
                      <span>SHOP NOW</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
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
            className="fixed inset-0 z-50 bg-[#09090b]/98 backdrop-blur-2xl flex flex-col p-6 md:p-16 justify-between select-none pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onWheel={(e) => e.stopPropagation()}
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

      {/* MOBILE MENU OVERLAY (Sidebar Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Left Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[85%] max-w-[340px] bg-white h-[100dvh] shadow-2xl flex flex-col z-[101] pointer-events-auto"
              onWheel={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-zinc-900 transition-colors z-10 bg-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="shrink-0 p-6 pt-10 border-b border-zinc-200 flex items-center gap-4 bg-white">
                <div className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-zinc-900 font-bold text-lg leading-tight tracking-wide">Frank Nava</h3>
                  <p className="text-zinc-500 text-[13px] tracking-wide mt-0.5">Premium Member</p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain bg-white flex flex-col">
                <div className="p-6 space-y-8 flex-1">
                  {/* SHOP CATEGORIES */}
                  <div className="space-y-1">
                    <h4 className="text-zinc-900 text-[11px] font-bold uppercase tracking-widest mb-3">Shop Categories</h4>
                    
                    {[
                      { icon: 'custom', label: 'Magic Mushrooms', path: '/productlist', highlight: true },
                      { icon: Activity, label: 'Microdose', path: '/productlist' },
                      { icon: Heart, label: 'Edibles', path: '/productlist' },
                      { icon: Store, label: 'Capsules', path: '/productlist' },
                    ].map((cat, idx) => (
                      <Link to={cat.path} key={idx} onClick={() => setIsMobileMenuOpen(false)} className="block">
                        {cat.highlight ? (
                          <div className="bg-brand-red rounded-xl p-4 flex items-center justify-between cursor-pointer mb-2">
                            <div className="flex items-center gap-3 text-white">
                              {cat.icon === 'custom' ? (
                                <img src={funguyzLogo} alt="Icon" className="w-5 h-5 object-contain filter brightness-0 invert" />
                              ) : (
                                <cat.icon className="w-5 h-5" />
                              )}
                              <span className="font-bold text-[15px]">{cat.label}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="py-3 px-2 flex items-center justify-between cursor-pointer hover:bg-zinc-50 rounded-lg transition-colors group">
                            <div className="flex items-center gap-3 text-zinc-900">
                              <cat.icon className="w-5 h-5 text-zinc-800" strokeWidth={1.5} />
                              <span className="font-semibold text-[15px]">{cat.label}</span>
                            </div>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* MY ACCOUNT */}
                  <div className="space-y-1 pb-4 pt-4 border-t border-zinc-200">
                    <h4 className="text-zinc-900 text-[11px] font-bold uppercase tracking-widest mb-3">My Account</h4>
                    
                    {[
                      { icon: User, label: 'Profile Settings', path: '/profile' },
                      { icon: FileText, label: 'Order History', path: '/orders' },
                      { icon: HelpCircle, label: 'Help Center', path: '/#help' },
                    ].map((item, idx) => (
                      <Link to={item.path} key={idx} onClick={() => setIsMobileMenuOpen(false)} className="block">
                        <div className="py-3 px-2 flex items-center gap-3 cursor-pointer hover:bg-zinc-50 rounded-lg transition-colors group">
                          <item.icon className="w-5 h-5 text-zinc-800" strokeWidth={1.5} />
                          <span className="text-zinc-900 font-semibold text-[15px]">{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Section (Now Scrollable) */}
                <div className="shrink-0 p-6 border-t border-zinc-200 mt-auto">
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); onOpenLogin(); }}
                    className="flex items-center gap-3 text-brand-red hover:text-[#d80870] transition-colors mb-6 font-bold text-[15px] w-full text-left"
                  >
                    <LogOut className="w-5 h-5" strokeWidth={1.5} />
                    Logout
                  </button>
                  <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
                    <span>© 2026 Fun Guyz</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Server Online</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-700/95 backdrop-blur-lg border-t border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-[40] px-6 py-3 flex items-center justify-between pb-safe">
          <Link to="/productlist" className="flex flex-col items-center gap-1 text-white/90 hover:text-brand-red transition-colors">
            <Store className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Shop</span>
          </Link>
          <Link to="/#sale" className="flex flex-col items-center gap-1 text-white/90 hover:text-brand-red transition-colors">
            <Tag className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-wide">On Sale</span>
          </Link>
          <Link to="/#bundles" className="flex flex-col items-center gap-1 text-white/90 hover:text-brand-red transition-colors">
            <Package className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Bundles</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-white/90 hover:text-brand-red transition-colors">
            <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Chat</span>
          </button>
        </div>
      )}
    </>
  )
}
