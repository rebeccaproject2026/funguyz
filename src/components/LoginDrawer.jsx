import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginDrawer({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`${isLogin ? 'Signing In' : 'Registering'} with ${email}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col font-sans"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-brand-dark">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-brand-gray transition-colors text-zinc-500 hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar flex flex-col justify-between">
              <div className="space-y-6">
                <p className="text-zinc-500 text-sm">
                  {isLogin 
                    ? 'Sign in to access your orders, wishlist, and recommendations.' 
                    : 'Join the FUN GUYZ street squad to get early drops, exclusive sales, and reward points.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="relative">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3 bg-brand-gray border border-transparent rounded-xl focus:border-brand-red focus:bg-white transition-all text-sm outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-brand-gray border border-transparent rounded-xl focus:border-brand-red focus:bg-white transition-all text-sm outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Password</label>
                      {isLogin && (
                        <a href="#forgot" className="text-xs font-semibold text-brand-red hover:underline">Forgot?</a>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-11 py-3 bg-brand-gray border border-transparent rounded-xl focus:border-brand-red focus:bg-white transition-all text-sm outline-none font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-dark"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 bg-brand-dark hover:bg-brand-red text-white font-display font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/10 hover:shadow-brand-red/20 transition-all duration-300 mt-2"
                  >
                    <span>{isLogin ? 'SIGN IN TO ACCOUNT' : 'CREATE FREE ACCOUNT'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-brand-border"></div>
                  <span className="flex-shrink mx-4 text-zinc-400 text-xs font-bold uppercase tracking-widest">or join with</span>
                  <div className="flex-grow border-t border-brand-border"></div>
                </div>

                {/* Social logins */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-brand-border rounded-xl hover:bg-brand-gray transition-colors text-xs font-bold text-brand-dark">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#ea4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.99 5.99 0 0 1 8 12.6c0-3.3 2.7-6 6-6c1.55 0 2.97.58 4.07 1.54l3.07-3.07A9.95 9.95 0 0 0 14 1C7.9 1 3 5.9 3 12c0 6.1 4.9 11 11 11c5.8 0 10.7-4.1 10.7-10.7c0-.72-.07-1.41-.2-2.015H12.24Z" />
                    </svg>
                    <span>GOOGLE</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-brand-border rounded-xl hover:bg-brand-gray transition-colors text-xs font-bold text-brand-dark">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.73-1.2 1.88-1.05 3 .16.03.32.05.49.05.88 0 2.05-.68 2.51-1.5" />
                    </svg>
                    <span>APPLE</span>
                  </button>
                </div>
              </div>

              {/* Bottom Switch Link */}
              <div className="pt-6 text-center border-t border-brand-border text-sm">
                <span className="text-zinc-500">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold text-brand-red hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
