import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'

export default function AddedToBagToast({ item, subtotal, isVisible, onClose, onViewCart }) {
  if (!item) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          className="fixed top-2 right-3 z-[200] w-[340px] sm:w-[380px] bg-white border border-zinc-200 rounded-2xl shadow-2xl shadow-zinc-300/60 overflow-hidden font-sans"
        >
          {/* Top accent line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#FA0C83] to-[#01CBDF]" />

          <div className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FA0C83] animate-pulse" />
                <span className="text-[11px] font-black text-zinc-800 uppercase tracking-widest font-display">
                  Added to Your Bag
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-100 mb-4" />

            {/* Product Row */}
            <div className="flex gap-3 items-start mb-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-zinc-200 flex-shrink-0 bg-zinc-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-black text-[#FA0C83] uppercase tracking-widest mb-0.5 font-display">
                  FUN GUYZ
                </p>
                <p className="text-sm font-bold text-zinc-800 leading-tight line-clamp-2 font-display">
                  {item.name}
                </p>
                <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">
                  {item.size}
                </p>
              </div>
              <span className="text-sm font-black text-zinc-800 font-display flex-shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between py-3 border-t border-b border-zinc-100 mb-4">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sub-Total</span>
              <span className="text-base font-black text-zinc-800 font-display">${subtotal.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => { onViewCart(); onClose() }}
                className="w-full py-3 bg-[#FA0C83] hover:bg-[#d4006e] text-white font-display font-black text-[11px] tracking-widest uppercase rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#FA0C83]/25"
              >
                <ShoppingBag className="w-4 h-4" />
                My Cart
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 bg-transparent border border-zinc-200 hover:border-zinc-400 text-zinc-700 hover:text-zinc-900 font-display font-black text-[11px] tracking-widest uppercase rounded-xl transition-all duration-200 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
