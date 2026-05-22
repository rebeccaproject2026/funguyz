import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Truck, MapPin, Package } from 'lucide-react';
import Stepper from '../components/Stepper';

export default function OrderComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  
  const orderItems = state.cartItems || [];
  const subtotal = state.subtotal || 0;
  const tax = state.tax || 0;
  const total = state.total || 0;
  const discount = state.discount || 0;
  const delivery = state.delivery || 'sameday';
  const deliveryFee = state.deliveryFee || 0;

  return (
    <div className="min-h-screen bg-[#F8F6F6] pt-28 pb-36 md:pb-20 text-[#181211]">
      <div className="w-full md:max-w-[85%] lg:max-w-[70%] mx-auto px-4 sm:px-6">
        
        <Stepper currentStep={3} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-8 mb-16"
        >
          <div className="w-24 h-24 mx-auto bg-[var(--color-brand-red)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--color-brand-red)]/20">
            <CheckCircle className="w-12 h-12 text-[var(--color-brand-red)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Thank You!</h1>
          <p className="text-zinc-500 text-lg">
            Order <span className="font-bold text-[#181211]">#FGZ-84729</span> is confirmed and being prepared.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Estimated Delivery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-md p-8 text-[#181211]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-[var(--color-brand-red)] w-6 h-6" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-[var(--color-brand-red)]">Estimated Delivery</h3>
            </div>
            <p className="text-2xl font-bold mb-2">Today, 2–4 PM</p>
            <p className="text-[#475569]">
              {delivery === 'sameday' ? 'Same Day Delivery · Free' : 'Express (1-2 Hours) · $5.00'}
            </p>
          </motion.div>

          {/* Delivery Address */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-8 text-[#181211]"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-[var(--color-brand-red)] w-6 h-6" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-[var(--color-brand-red)]">Delivery Address</h3>
            </div>
            <p className="text-xl font-bold mb-2">{state.form?.address || '123 Mushroom Lane'}</p>
            <p className="text-[#475569]">{`${state.form?.city || 'Mycology City'}, ${state.form?.state || 'NY'} ${state.form?.zip || '10001'}`}</p>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="bg-white rounded-3xl border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden mb-12 text-[#181211]"
        >
          <div className="px-6 py-5 flex justify-between items-center border-b border-zinc-100">
            <h3 className="text-lg font-bold text-[#0F172A]">Order Summary</h3>
            <span className="text-[#64748B] text-sm">{orderItems.length} Items</span>
          </div>

          <div className="p-6">
            <div className="space-y-6 mb-6">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-zinc-100 flex-shrink-0 flex items-center justify-center p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center py-1">
                    <h4 className="font-bold text-[15px] text-[#0F172A] leading-tight line-clamp-1">{item.name}</h4>
                    <p className="text-[#64748B] text-[13px] mt-0.5 line-clamp-1">{item.description} · Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-[var(--color-brand-red)] text-[15px] flex items-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 pt-6 space-y-4">
              <div className="flex justify-between text-[15px] text-[#475569]">
                <span>Subtotal</span>
                <span className="text-[#0F172A] font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[15px] text-[#475569]">
                <span>Estimated Tax</span>
                <span className="text-[#0F172A] font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[15px] text-[#475569]">
                <span>Delivery Fee</span>
                <span className={deliveryFee > 0 ? "text-[#0F172A] font-bold" : "text-green-600 font-bold uppercase"}>
                  {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[15px] text-[#047857]">
                  <span>Discount</span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-5 border-t border-zinc-100">
                <span className="text-xl font-bold text-[#0F172A]">Total Paid</span>
                <span className="text-2xl font-black text-[#0F172A]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="hidden md:flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('/track-order', { state })}
            className="bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold py-4 px-8 rounded-xl transition-colors cursor-pointer flex items-center gap-2 justify-center"
          >
            <MapPin className="w-5 h-5" /> Track My Order
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-white border-2 border-[var(--color-brand-red)] text-[var(--color-brand-red)] font-bold py-4 px-8 rounded-xl transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>

      {/* Mobile Sticky Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 md:hidden z-50 flex gap-3 border-t border-zinc-200">
        <button 
          onClick={() => navigate('/track-order', { state })}
          className="flex-1 bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold py-3.5 px-2 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
        >
          <MapPin className="w-4 h-4" /> Track My Order
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex-1 bg-white border border-[var(--color-brand-red)] text-[var(--color-brand-red)] font-bold py-3.5 px-2 rounded-xl flex items-center justify-center shadow-sm transition-colors text-sm"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
