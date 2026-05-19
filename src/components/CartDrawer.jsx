import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
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
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-brand-red" />
                <h2 className="font-display font-bold text-xl text-brand-dark">Shopping Bag ({cartItems.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-brand-gray transition-colors text-zinc-500 hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
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
                      className="flex gap-4 p-3 rounded-2xl border border-brand-border hover:shadow-md transition-shadow relative overflow-hidden bg-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-gray flex-shrink-0 border border-brand-border">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Specs */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="font-display font-semibold text-brand-dark text-sm md:text-base line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">Size: {item.size} | Color: {item.color}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-brand-border rounded-full py-0.5 px-2 bg-brand-gray/50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="text-zinc-500 hover:text-brand-dark px-1 text-sm font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-brand-dark">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-zinc-500 hover:text-brand-dark px-1 text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                          
                          <span className="font-display font-bold text-brand-red text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg text-zinc-400 hover:text-brand-red hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-brand-border bg-brand-gray/30 space-y-4">
                <div className="space-y-2 text-sm text-zinc-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-dark">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="border-t border-brand-border/60 my-2 pt-2 flex justify-between font-display text-base font-bold text-brand-dark">
                    <span>Total</span>
                    <span className="text-brand-red text-lg">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-brand-dark hover:bg-brand-red text-white font-display font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/10 hover:shadow-brand-red/20 transition-all duration-300"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
