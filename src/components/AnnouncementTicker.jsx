import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, HelpCircle, Phone, Sparkles, Users } from 'lucide-react'

const items = [
  "WELCOME TO OUR STORE!",
  "FREE SHIPPING ON ALL LATEST DROPS OVER $75",
  "HUGE SALE ACTIVE: MIN. 40-80% OFF EVERYTHING",
  "STREETWEAR DROP 01 IS NOW LIVE",
];
export default function AnnouncementTicker() {
  return (
    <div className="w-full bg-[#09090b] text-white py-2 pr-4  flex justify-between items-center text-[10px] md:text-xs font-bold tracking-wider relative z-50 select-none border-b border-zinc-900">

      {/* Continuous Scrolling Marquee Text */}
      <Link
        to="/blog"
        className="flex-1 overflow-hidden relative h-5 flex items-center cursor-pointer group"
        aria-label="Go to Blog"
      >
        <div className="flex w-max animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused]">

          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-10 whitespace-nowrap pr-10"
            >
              <span className="flex items-center gap-1.5 text-brand-red">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span>WELCOME TO OUR STORE!</span>
              </span>

              <span className="text-zinc-400">•</span>

              <span>FREE SHIPPING ON ALL LATEST DROPS OVER $75</span>

              <span className="text-zinc-400">•</span>

              <span className="text-brand-red font-black">
                HUGE SALE ACTIVE: MIN. 40-80% OFF EVERYTHING
              </span>

              <span className="text-zinc-400">•</span>

              <span>STREETWEAR DROP 01 IS NOW LIVE</span>
            </div>
          ))}
        </div>
      </Link>

      {/* Tailwind v4 Inline Animation */}
      <style>{`
  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`}</style>

      {/* Quick utility links */}
      <div className="hidden md:flex items-center gap-6 text-white font-semibold border-l border-zinc-800 pl-5">
        <Link to="/#about" className="flex items-center gap-1 hover:text-brand-red transition-colors">
          <Users className="w-3 h-3 text-brand-red" />
          <span>ABOUT</span>
        </Link>
        <Link to="/blog" className="flex items-center gap-1 hover:text-brand-red transition-colors">
          <BookOpen className="w-3 h-3 text-brand-red" />
          <span>BLOG</span>
        </Link>
        <Link to="/faq" className="flex items-center gap-1 hover:text-brand-red transition-colors">
          <HelpCircle className="w-3 h-3 text-brand-red" />
          <span>FAQ</span>
        </Link>
        <Link to="/contact-us" className="flex items-center gap-1 hover:text-brand-red transition-colors">
          <Phone className="w-3 h-3 text-brand-red" />
          <span>CONTACT</span>
        </Link>
      </div>

    </div>
  )
}
