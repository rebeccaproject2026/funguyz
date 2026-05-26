import { Link } from 'react-router-dom'
import { BookOpen, HelpCircle, Phone, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AnnouncementTicker() {
  return (
    <div className="w-full bg-[#09090b] text-white py-2 pr-10  flex justify-between items-center text-[10px] md:text-xs font-bold tracking-wider relative z-50 select-none border-b border-zinc-900">

      {/* Continuous Scrolling Marquee Text */}
      <Link
        to="/blog"
        className="flex-1 overflow-hidden relative h-5 flex items-center cursor-pointer group"
        aria-label="Go to Blog"
      >
        <div className="ticker-track">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-10 whitespace-nowrap pr-10"
            >
              <span className="flex items-center gap-1.5 text-brand-red font-black">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span>Canada’s Largest Magic Mushroom Dispensary</span>
              </span>

              <span className="text-zinc-400">•</span>

              <span>Toronto Magic Mushroom Delivery Same-Day</span>

              <span className="text-zinc-400">•</span>

              <span>Ottawa Magic Mushroom Delivery Same-Day</span>

              <span className="text-zinc-400">•</span>

              <span>Free Delivery on Orders Over $120</span>

              <span className="text-zinc-400">•</span>

              <span className="text-brand-red font-black">
                30% OFF All Products + Promo Coupons
              </span>

              <span className="text-zinc-400">•</span>

              <span>Express Delivery Under 2 Hours</span>

              <span className="text-zinc-400">•</span>

              <span>Buy Magic Mushrooms Canada-Wide Shipping</span>
            </div>
          ))}
        </div>
      </Link>

      {/* Hardware Accelerated Inline Animation */}
      <style>{`
        @keyframes smooth-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: smooth-marquee 40s linear infinite;
          will-change: transform;
          -webkit-transform: translate3d(0,0,0);
        }
      `}</style>

      {/* Quick utility links */}
      <div className="hidden md:flex items-center gap-6 text-white font-semibold border-l border-zinc-800 pl-12">
        <Link to="/about" className="flex items-center gap-1 hover:text-brand-red transition-colors">
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
