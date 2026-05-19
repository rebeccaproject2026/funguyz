import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import funguyzLogo from '../assets/images/funguyzlogo.png'

// Inline SVG social icons (lucide doesn't export brand icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)
const RssIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/>
    <circle cx="5" cy="19" r="1"/>
  </svg>
)

const footerLinks = {
  INFORMATION: ['About Us', 'Store Location', 'Contact Us', 'Shipping & Delivery', 'Latest News', 'Our Sitemap'],
  'OUR SERVICE': ['Privacy Policy', 'Terms of Sale', 'Customer Service', 'Delivery Information', 'Payments', 'Saved Cards'],
  'MY ACCOUNT': ['My Account', 'My Shop', 'My Cart', 'Checkout', 'My Wishlist', 'Tracking Order'],
}

const socials = [
  { icon: FacebookIcon,  color: '#1877F2', label: 'Facebook'  },
  { icon: TwitterIcon,   color: '#1DA1F2', label: 'Twitter'   },
  { icon: LinkedinIcon,  color: '#0A66C2', label: 'LinkedIn'  },
  { icon: InstagramIcon, color: '#E1306C', label: 'Instagram' },
  { icon: YoutubeIcon,   color: '#FF0000', label: 'YouTube'   },
  { icon: RssIcon,       color: '#f9362d', label: 'RSS'       },
]

const paymentIcons = ['VISA', 'PayPal', 'Discover', 'MC', 'Maestro', 'Amex']

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="w-full bg-[#111113] text-white select-none relative overflow-hidden border-t border-zinc-900">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-[#FA0C83]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-[#01CBDF]/[0.02] blur-[120px] pointer-events-none" />

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 — Brand info */}
          <div className="lg:col-span-1 space-y-4">
            <img
              src={funguyzLogo}
              alt="Funguyz Logo"
              className="h-12 w-auto object-contain mb-2"
            />
            <p className="text-zinc-400 text-sm leading-relaxed">
              Premium organic mushroom products crafted for your journey. Quality, trust, and discretion — always.
            </p>
            <div className="space-y-2">
              {[
                { icon: MapPin, text: '2046 Shroom St, Vancouver, BC' },
                { icon: Phone,  text: '+1 (576) 245-2470'             },
                { icon: Mail,   text: 'info@funguyz.com'              },
                { icon: Clock,  text: 'Mon – Fri / 9:00 AM – 6:00 PM'},
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3 text-zinc-400 hover:text-white text-sm transition-colors duration-200 group">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FA0C83] group-hover:scale-110 transition-transform duration-200" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cols 2-4 — Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="space-y-3">
              <h4 className="font-black text-xs uppercase tracking-[0.25em] text-white border-b border-zinc-800/80 pb-2">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-zinc-400 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 group relative py-0.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FA0C83] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 5 — Newsletter */}
          <div className="space-y-3">
            <h4 className="font-black text-xs uppercase tracking-[0.25em] text-white border-b border-zinc-800/80 pb-2">
              Newsletter
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Subscribe to our mailing list to get the new updates!
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-[#FA0C83] focus:shadow-[0_0_12px_rgba(250,12,131,0.15)] text-white text-sm placeholder-zinc-600 px-4 py-3 rounded-xl outline-none transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[11px] font-black uppercase tracking-widest cursor-pointer shadow-lg shadow-[#FA0C83]/10 hover:shadow-[#FA0C83]/20 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #FA0C83, #01CBDF)' }}
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Socials */}
            <div className="pt-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Follow Us</p>
              <div className="flex flex-wrap gap-2">
                {socials.map(({ icon: Icon, color, label }) => (
                  <motion.a
                    key={label}
                    href="#"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(250,12,131,0.2)]"
                    onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-zinc-900 bg-zinc-950/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs font-bold tracking-wider">
            Fun Guyz © 2026 · All Rights Reserved.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {paymentIcons.map((name) => (
              <div
                key={name}
                className="h-8 px-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg flex items-center justify-center text-[10px] font-black text-zinc-400 tracking-wide hover:text-white hover:border-zinc-700 transition-colors duration-200"
              >
                {name}
              </div>
            ))}
          </div>

          <div className="flex gap-5 text-xs font-bold text-zinc-500 tracking-wider">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
