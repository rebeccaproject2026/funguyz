import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, MapPin, Package, User, Tag, FlaskConical } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promo, setPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const delivery = 'sameday';

  const { cartItems, cartSubtotal, cartTax, cartTotal, handleUpdateQuantity, clearCart } = useCart();

  const deliveryFee = delivery === 'express' ? 5 : 0;
  const discount = promoApplied
      ? promoApplied.type === 'percent'
          ? +(cartSubtotal * promoApplied.discount / 100).toFixed(2)
          : promoApplied.discount
      : 0;
  const total = cartTotal + deliveryFee - discount;

  const handleUpdateQuantityWrapper = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      handleUpdateQuantity(id, Math.max(1, item.quantity + delta));
    }
  };

  const handleApplyPromo = () => {
      const code = promo.trim().toUpperCase();
      if (!code) { setPromoError('Invalid promo code.'); return; }
      if (code === 'SHROOM10' || code === 'SAVE15' || code === 'WELCOME20') {
          setPromoApplied({ code, discount: 15, type: 'flat' });
          setPromoError('');
      } else {
          setPromoApplied(null);
          setPromoError('Invalid promo code.');
      }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, x: 0,
      transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F6] pt-28 pb-20 text-[#181211]">
      <div className="max-w-[85%] mx-auto px-4">
        
        <Stepper currentStep={2} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column - Forms */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-5"
          >
            {/* Contact Info */}
            <motion.section variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-[#181211]">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-[#181211] font-semibold mb-1.5 block">First Name *</label>
                  <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400" placeholder="John" />
                </div>
                <div>
                  <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Last Name *</label>
                  <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400" placeholder="Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Email Address *</label>
                  <input type="email" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400" placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Phone Number *</label>
                  <input type="tel" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </motion.section>

            {/* Billing & Shipping Address */}
            <motion.section variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-[#181211]">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Billing and Delivery</h2>
              
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Country / Region *</label>
                  <select className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white appearance-none">
                    <option>United States (US)</option>
                    <option>Canada</option>
                    <option>United Kingdom (UK)</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Street Address *</label>
                  <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400 mb-3" placeholder="House number and street name" />
                  <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400" placeholder="Apartment, suite, unit, etc. (optional)" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-sm text-[#181211] font-semibold mb-1.5 block">City *</label>
                    <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400" placeholder="San Francisco" />
                  </div>
                  <div>
                    <label className="text-sm text-[#181211] font-semibold mb-1.5 block">State *</label>
                    <select className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white appearance-none">
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>Florida</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-[#181211] font-semibold mb-1.5 block">ZIP Code *</label>
                    <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400" placeholder="94103" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Order Notes (optional)</label>
                  <textarea className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400 h-24 resize-none" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </div>
              </div>
            </motion.section>

            {/* Payment Method */}
            <motion.section variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-[#181211]">
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Payment Method</h2>
              <p className="text-sm text-[#64748B] mb-6">Choose how you'd like to pay for your order securely.</p>
              
              <div className="space-y-4 mb-6">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'bg-[var(--color-brand-red)]/5 border-[var(--color-brand-red)]' : 'bg-white border-[#E2E8F0] hover:border-gray-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-4 h-4 accent-[var(--color-brand-red)]"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="ml-3 flex items-center justify-between w-full">
                    <span className="font-semibold text-[#181211]">Credit Card</span>
                    <div className="flex gap-2">
                      <div className="w-9 h-6 bg-gray-100 text-[#475569] rounded flex items-center justify-center text-[10px] font-bold border border-gray-200">VISA</div>
                      <div className="w-9 h-6 bg-gray-100 text-[#475569] rounded flex items-center justify-center text-[10px] font-bold border border-gray-200">MC</div>
                    </div>
                  </div>
                </label>
                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'bg-[var(--color-brand-red)]/5 border-[var(--color-brand-red)]' : 'bg-white border-[#E2E8F0] hover:border-gray-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-4 h-4 accent-[var(--color-brand-red)]"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <span className="ml-3 font-semibold text-[#181211]">PayPal</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-5 overflow-hidden"
                >
                  <div>
                    <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Card Number</label>
                    <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400 font-mono" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-[#181211] font-semibold mb-1.5 block">Expiry Date</label>
                      <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400 font-mono" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-sm text-[#181211] font-semibold mb-1.5 block">CVC</label>
                      <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] transition-colors bg-white placeholder-gray-400 font-mono" placeholder="123" />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 text-zinc-900"
          >
            <OrderSummary 
                subtotal={cartSubtotal}
                tax={cartTax}
                total={total}
                deliveryFee={deliveryFee}
                discount={discount}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantityWrapper}
                showItems={true}
                showTerms={true}
                promoCode={promo}
                setPromoCode={setPromo}
                promoError={promoError}
                promoApplied={promoApplied}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={() => { setPromoApplied(null); setPromo(''); }}
                buttonText="Place Order Securely"
                buttonIcon={ShieldCheck}
                onButtonClick={() => {
                  const orderSnapshot = {
                    cartItems, subtotal: cartSubtotal, tax: cartTax, total, deliveryFee, discount, delivery
                  };
                  clearCart();
                  navigate('/order-complete', { state: orderSnapshot });
                }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
