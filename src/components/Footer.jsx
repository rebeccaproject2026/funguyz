import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import funguyzLogo from '../assets/images/funguyzlogo.png'

// Inline SVG social icons (lucide doesn't export brand icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
)
const RssIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1" />
  </svg>
)

const footerLinks = {
  'QUICK ACCESS': ['Shop All', 'About Us', 'Contact Us', 'My Account', 'Track Order', 'Mushroom FAQ'],
  'KNOWLEDGE HUB': ['What to Expect', 'Mushroom Varieties Guide', 'Dosage & Usage Guide', 'Health Benefits', 'Recipes & Tips'],
  'SERVICE AREAS': ['Vancouver', 'Toronto', 'Calgary', 'Express 1 Hour Delivery', 'Same Day Delivery'],
}

const socials = [
  { icon: FacebookIcon,color: '#E1306C', label: 'Facebook' },
  { icon: TwitterIcon, color: '#E1306C', label: 'Twitter' },
  { icon: LinkedinIcon, color: '#E1306C', label: 'LinkedIn' },
  { icon: InstagramIcon, color: '#E1306C', label: 'Instagram' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="w-full bg-[#111113] text-white select-none relative overflow-visible mt-10">
      
      {/* WAVY DIVIDER: Transitions any page background into footer */}
      <div className="absolute left-0 right-0 bottom-full w-full overflow-hidden leading-[0] bg-transparent pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.12" />
          <path d="M0,75 C300,35 600,100 900,45 C1050,15 1120,55 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.1" />
          <path d="M0,88 C250,55 550,95 850,55 C1000,35 1100,70 1200,62 L1200,120 L0,120 Z" fill="#111113" />
        </svg>
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-[#FA0C83]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-[#01CBDF]/[0.02] blur-[120px] pointer-events-none" />

      {/* ── Main footer grid ── */}
      <div className="max-w-[90%] mx-auto px-4 md:px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Col 1 — Brand info */}
          <div className="lg:col-span-1 space-y-4">
            <img
              src={funguyzLogo}
              alt="Funguyz Logo"
              className="h-18 w-auto object-contain mb-0 -mt-4"
            />
            <p className="text-zinc-400 text-sm leading-relaxed">
              Premium organic mushroom products crafted for your journey. Quality, trust, and discretion — always.
            </p>
            {/* Socials */}
            <div className="pt-2">
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

          {/* Cols 2-4 — Link columns */}
          {Object.entries(footerLinks).map(([heading, links], idx, arr) => (
            <div key={heading} className={`space-y-3 text-left ${idx === 0 ? 'lg:ml-8' : ''} ${idx === arr.length - 1 ? 'lg:mr-8' : ''}`}>
              <h4 className="font-black text-xs uppercase tracking-[0.25em] text-white border-b border-zinc-800/80 pb-2">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => {
                  const isContact = link === 'Contact Us';
                  const isBlog = link === 'Recipes & Cooking Tips';
                  const isShop = link === 'Shop All';
                  const isTrackOrder = link === 'Track Order';

                  return (
                    <li key={link}>
                      {isContact || isBlog || isShop || isTrackOrder ? (
                        <Link
                          to={isContact ? '/contact-us' : isShop ? '/#shop' : isTrackOrder ? '/track-order' : '/blog'}
                          className="text-zinc-400 hover:text-white text-sm font-medium transition-all duration-300 flex items-center group relative py-0.5 pl-0"
                        >
                          <span className="absolute -left-3.5 w-1.5 h-1.5 rounded-full bg-[#FA0C83] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link}
                          </span>
                        </Link>
                      ) : (
                        <a
                          href="/"
                          className="text-zinc-400 hover:text-white text-sm font-medium transition-all duration-300 flex items-center group relative py-0.5 pl-0"
                        >
                          <span className="absolute -left-3.5 w-1.5 h-1.5 rounded-full bg-[#FA0C83] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link}
                          </span>
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Col 5 — Newsletter */}
          <div className="space-y-3 lg:col-span-1">
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
                className="w-full bg-zinc-900/80 border border-zinc-700 focus:border-[#FA0C83] focus:shadow-[0_0_12px_rgba(250,12,131,0.15)] text-white text-sm placeholder-zinc-600 px-4 py-3 rounded-xl outline-none transition-all duration-300"
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
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-zinc-900 bg-zinc-950/20 relative z-10">
        <div className="max-w-[90%] mx-auto px-4 md:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs font-bold tracking-wider w-full sm:w-1/3 text-left">
            Fun Guyz © 2026 · All Rights Reserved.
          </p>

          <p className="text-zinc-400 text-xs font-bold tracking-wider w-full sm:w-1/3 text-center">
            Sourced from <a href="https://www.mushroomexpert.com" target="_blank" rel="noopener noreferrer" className="text-[#FA0C83] hover:text-[#01CBDF] transition-colors">MushroomExpert.com</a>
          </p>

          <div className="flex justify-start sm:justify-end gap-5 text-xs font-bold text-zinc-500 tracking-wider w-full sm:w-1/3">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
