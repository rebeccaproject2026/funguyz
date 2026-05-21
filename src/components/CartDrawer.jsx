import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate()
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[480px] bg-white shadow-2xl flex flex-col font-sans origin-top-right"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--color-brand-red)]" />
                <h2 className="font-bold text-lg text-[#181211]">My Cart</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[var(--color-brand-red)]/10 text-[var(--color-brand-red)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-[#181211]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-gray flex items-center justify-center text-zinc-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-brand-dark">Your bag is empty</h3>
                    <p className="text-zinc-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-brand-dark text-white rounded-full font-semibold hover:bg-brand-red transition-all hover:scale-105 duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 p-4 border border-zinc-200 rounded-xl bg-white relative group mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white flex-shrink-0 border border-zinc-200 p-0.5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      </div>

                      {/* Product Specs */}
                      <div className="flex-1 flex flex-col justify-center gap-1">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="font-bold text-[#181211] text-[15px] leading-tight line-clamp-1">{item.name}</h4>
                            <p className="text-[13px] text-zinc-400 font-medium mt-1">Size: Whole | Color: Signature Red Label</p>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-zinc-400 hover:text-[var(--color-brand-red)] transition-colors p-1 -mt-1 -mr-1 flex-shrink-0"
                          >
                            <Trash2 className="w-[18px] h-[18px]" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-3 bg-[#F8F9FA] rounded-full px-3 py-1.5 border border-zinc-200">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="text-zinc-500 hover:text-[#181211] px-1 text-sm font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="w-4 text-center text-[13px] font-bold text-[#181211]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-zinc-500 hover:text-[#181211] px-1 text-sm font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <span className="font-bold text-[#FF1493] text-[17px]">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-white space-y-4 border-t border-zinc-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                <div className="space-y-3 text-sm text-[#181211]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-500 font-bold uppercase text-[11px] tracking-wider pt-0.5">Free</span>
                  </div>
                  <div className="border-t border-zinc-100 my-2 pt-3 flex justify-between font-bold text-[#181211]">
                    <span>Total Amount</span>
                    <span className="text-[var(--color-brand-red)] text-lg">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      navigate('/cart', { state: { cartItems, subtotal, tax: +(subtotal*0.08).toFixed(2), total: subtotal + +(subtotal*0.08).toFixed(2), deliveryFee: 0, discount: 0, delivery: 'sameday' } });
                    }, 200);
                  }}
                  className="w-full py-3.5 bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span className="text-xs uppercase tracking-wider">CHECKOUT NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <div className="flex items-center justify-center gap-1.5 pt-1 text-zinc-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="text-[9px] font-bold uppercase tracking-wider">100% ENCRYPTED PAYMENT</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
