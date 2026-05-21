import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function ShippingModal({ isOpen, onClose }) {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'checking', 'success'

  const handleCheck = () => {
    if (!zip.trim()) return;
    setStatus('checking');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setZip('');
      setStatus('idle');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'idle' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#01CBDF]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#01CBDF]/20">
                  <MapPin className="w-8 h-8 text-[#01CBDF]" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                  Check Shipping
                </h3>
                <p className="text-zinc-400 text-sm mb-8">
                  Enter your Zip or Postal Code to see if we deliver to your area.
                </p>

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="e.g. 90210 or M5V 2H1"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-center text-white text-lg font-bold tracking-widest uppercase outline-none focus:border-[#01CBDF] transition-colors placeholder-zinc-600"
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                  />
                  <button
                    onClick={handleCheck}
                    disabled={!zip.trim()}
                    className="w-full bg-white hover:bg-[#01CBDF] text-black font-black uppercase tracking-widest py-4 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
                  >
                    Verify Location
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'checking' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="w-12 h-12 text-[#01CBDF] animate-spin mb-6" />
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Verifying Route...
                </h3>
                <p className="text-zinc-500 text-sm mt-2">Checking nationwide logistics network</p>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                  Delivery Available!
                </h3>
                <p className="text-zinc-300 text-base leading-relaxed mb-8">
                  Great news! We offer fast, highly discreet nationwide shipping directly to <span className="text-white font-bold uppercase">{zip}</span>.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full bg-[#01CBDF] hover:bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
