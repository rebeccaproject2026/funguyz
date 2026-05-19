import React from 'react'
import { BookOpen, HelpCircle, Phone, Sparkles } from 'lucide-react'

export default function AnnouncementTicker() {
  return (
    <div className="w-full bg-[#09090b] text-white py-2 px-4 md:px-12 flex justify-between items-center text-[10px] md:text-xs font-bold tracking-wider relative z-50 select-none border-b border-zinc-900">

      {/* Continuous Scrolling Marquee Text */}
      <div className="flex-1 overflow-hidden relative h-5 flex items-center max-w-lg md:max-w-xl">
        <div className="animate-[marquee_22s_linear_infinite] whitespace-nowrap flex items-center gap-10 absolute left-0">
          <span className="flex items-center gap-1.5 text-brand-red">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span>WELCOME TO OUR STORE!</span>
          </span>
          <span className="text-zinc-400">•</span>
          <span>FREE SHIPPING ON ALL LATEST DROPS OVER $75</span>
          <span className="text-zinc-400">•</span>
          <span className="text-brand-red font-black">HUGE SALE ACTIVE: MIN. 40-80% OFF EVERYTHING</span>
          <span className="text-zinc-400">•</span>
          <span>STREETWEAR DROP 01 IS NOW LIVE</span>
        </div>
      </div>

      {/* Tailwind marquee animation injected natively for Tailwind v4 */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Quick utility links */}
      <div className="hidden md:flex items-center gap-5 text-white font-semibold border-l border-zinc-800 pl-5">
        <a href="#blog" className="flex items-center gap-1 hover:text-white transition-colors">
          <BookOpen className="w-3 h-3 text-brand-red" />
          <span>BLOG</span>
        </a>
        <a href="#faq" className="flex items-center gap-1 hover:text-white transition-colors">
          <HelpCircle className="w-3 h-3 text-brand-red" />
          <span>FAQ</span>
        </a>
        <a href="#contact" className="flex items-center gap-1 hover:text-white transition-colors">
          <Phone className="w-3 h-3 text-brand-red" />
          <span>CONTACT US</span>
        </a>
      </div>

    </div>
  )
}
