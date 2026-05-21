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
    <div className="min-h-screen bg-[#F8F6F6] pt-28 pb-20 text-[#181211]">
      <div className="max-w-[70%] mx-auto px-4">
        
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
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-12 text-[#181211]"
        >
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="text-[var(--color-brand-red)] w-6 h-6" />
              <h3 className="text-xl font-bold">Order Summary</h3>
            </div>
            <span className="text-[#475569] font-medium">{orderItems.length} Items</span>
          </div>

          <div className="p-8">
            <div className="space-y-6 mb-8">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-6 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-[#E2E8F0]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-[#0F172A]">{item.name}</h4>
                    <p className="text-[#475569] text-sm">{item.description} · Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-[var(--color-brand-red)] text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E2E8F0] pt-6 space-y-4">
              <div className="flex justify-between text-[#475569]">
                <span>Subtotal</span>
                <span className="text-[#0F172A] font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#475569]">
                <span>Estimated Tax</span>
                <span className="text-[#0F172A] font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#475569]">
                <span>Delivery Fee</span>
                <span className={deliveryFee > 0 ? "text-[#0F172A] font-bold" : "text-green-600 font-bold uppercase"}>
                  {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-[#E2E8F0]">
                <span className="text-xl font-bold text-[#0F172A]">Total Paid</span>
                <span className="text-3xl font-black text-[var(--color-brand-red)]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('/track-order', { state })}
            className="bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold py-4 px-8 rounded-xl transition-colors cursor-pointer"
          >
            Track Order
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-transparent border border-[#181211]/20 hover:border-[#181211]/40 text-[#181211] font-bold py-4 px-8 rounded-xl transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}
