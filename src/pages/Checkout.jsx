import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, MapPin, Package, User, Tag, FlaskConical, ChevronDown, ChevronUp, ArrowRight, Mail, Phone, Home, Hash, Map, Navigation, CheckCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';
import { Icon } from '@iconify/react';

export default function Checkout() {
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promo, setPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('sameday'); // 'sameday', 'express', 'ship'

  const { cartItems, cartSubtotal, handleUpdateQuantity, clearCart } = useCart();

  const deliveryFee = deliveryType === 'express' ? 5 : 0;
  const discount = promoApplied
      ? promoApplied.type === 'percent'
          ? +(cartSubtotal * promoApplied.discount / 100).toFixed(2)
          : promoApplied.discount
      : 0;
  const total = cartSubtotal + deliveryFee - discount;

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

  const handlePlaceOrder = () => {
    const orderSnapshot = {
      cartItems, subtotal: cartSubtotal, total, deliveryFee, discount, deliveryType, paymentMethod
    };
    clearCart();
    navigate('/order-complete', { state: orderSnapshot });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F6] pt-28 pb-32 md:pb-20 text-[#181211]">
      <div className="w-full lg:max-w-[85%] mx-auto px-4 sm:px-6">
        
        <Stepper currentStep={2} />

        <div className="grid grid-cols-1  lg:grid-cols-12 gap-5">
          {/* Left Column - Forms */}
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-5"
          >
            <motion.section variants={itemVariants} className="bg-white p-6  border border-[#CBD5E1] sm:p-8 rounded-2xl shadow-md text-[#181211]">
              {/* Delivery Method Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                <button 
                  onClick={() => setDeliveryType('sameday')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 border ${deliveryType === 'sameday' ? 'bg-[var(--color-brand-red)] text-white border-[var(--color-brand-red)] shadow-[0_4px_12px_rgba(255,20,147,0.2)]' : 'bg-white text-[#181211] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-zinc-50'}`}
                >
                    <Icon className={`w-5 h-5 ${deliveryType === 'sameday' ? 'text-white' : 'text-zinc-400'}`} icon="ri:truck-line" /> Same Day Delivery
                </button>
                <button 
                  onClick={() => setDeliveryType('express')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 border ${deliveryType === 'express' ? 'bg-[var(--color-brand-red)] text-white border-[var(--color-brand-red)] shadow-[0_4px_12px_rgba(255,20,147,0.2)]' : 'bg-white text-[#181211] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-zinc-50'}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${deliveryType === 'express' ? 'text-white' : 'text-zinc-400'}`} icon="mdi:thunder-outline" /> Express Delivery
                  </div>
                </button>
                <button 
                  onClick={() => setDeliveryType('ship')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 border ${deliveryType === 'ship' ? 'bg-[var(--color-brand-red)] text-white border-[var(--color-brand-red)] shadow-[0_4px_12px_rgba(255,20,147,0.2)]' : 'bg-white text-[#181211] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-zinc-50'}`}
                >
                    <Icon className={`w-5 h-5 ${deliveryType === 'ship' ? 'text-white' : 'text-zinc-400'}`} icon="lucide:ship" /> Ship to My Address
                </button>
              </div>

              {/* Dynamic Helper Text */}
              <p className="text-[#3f3f46] text-sm font-medium mb-6">
                {deliveryType === 'sameday' && "Orders are delivered straight to your location within 3 to 5 Hours in select local areas."}
                {deliveryType === 'express' && "Express Delivery under 2 Hours (Minimum Order $120.00)"}
                {deliveryType === 'ship' && "Ships from one of our stores and arrives in 1 to 5 days, depending on the city and province."}
              </p>

              {/* Form Heading */}
              {/* <h2 className="text-xl sm:text-2xl font-bold mb-6">
                {deliveryType === 'ship' ? 'Shipping Address' : (deliveryType === 'express' ? 'Express Delivery Address' : 'Delivery Address')}
              </h2> */}

              <div className="flex flex-col gap-6">
                
                {/* Contact Information Group */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[var(--color-brand-red)]/10 p-1.5 rounded-lg">
                      <User className="w-4 h-4 text-[var(--color-brand-red)]" />
                    </div>
                    <h3 className="font-bold text-[#0F172A]">Contact Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">First Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="text" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="First Name" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">Last Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="text" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="Last Name" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="tel" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="Phone Number" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="email" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="Email Address" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information Group */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[var(--color-brand-red)]/10 p-1.5 rounded-lg">
                      <MapPin className="w-4 h-4 text-[var(--color-brand-red)]" />
                    </div>
                    <h3 className="font-bold text-[#0F172A]">Delivery Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">
                        {deliveryType === 'ship' ? 'Shipping Address *' : (deliveryType === 'express' ? 'Express Delivery Address *' : 'Delivery Address *')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Home className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="text" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder={deliveryType === 'ship' ? 'Shipping Address' : 'Delivery Address'} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">Unit (optional)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Hash className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="text" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="Unit#" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">City *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Map className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="text" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="City" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">Province *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="text" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="Province" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#475569] font-medium mb-1.5 block">Postal Code *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Navigation className="h-4 w-4 text-zinc-400" />
                        </div>
                        <input type="text" className="w-full border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 shadow-sm" placeholder="Postal Code" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm text-[#475569] font-medium mb-1.5 block">
                      {deliveryType === 'ship' ? 'Shipping Notes (optional)' : (deliveryType === 'express' ? 'Express Delivery Notes (optional)' : 'Delivery Notes (optional)')}
                    </label>
                    <textarea 
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white placeholder-gray-400 h-24 resize-none shadow-sm" 
                      placeholder={deliveryType === 'express' ? "Express Delivery Notes" : (deliveryType === 'ship' ? "Shipping Notes" : "Delivery Notes")}
                    ></textarea>
                  </div>
                </div>

              </div>
            </motion.section>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="hidden lg:block lg:col-span-5 text-zinc-900"
          >
            <OrderSummary 
                subtotal={cartSubtotal}
                total={total}
                deliveryFee={deliveryFee}
                deliveryType={deliveryType}
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
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                buttonText="Place Order Securely"
                buttonIcon={ShieldCheck}
                onButtonClick={handlePlaceOrder}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky Footer with Expandable Order Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:hidden z-50 flex flex-col rounded-t-3xl border-t border-zinc-200">
          
          {/* Header Toggle */}
          <button 
            onClick={() => setIsSummaryOpen(!isSummaryOpen)} 
            className="flex justify-between items-center w-full p-5 pb-2"
          >
            <span className="font-bold text-[#181211] text-lg">Order Summary</span>
            {isSummaryOpen ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
          </button>

          {/* Expandable Content */}
          <AnimatePresence>
            {isSummaryOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-white"
              >
                <div className="px-5 py-2 max-h-[50vh] overflow-y-auto space-y-5">
                  {/* Items List */}
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-50 flex-shrink-0 border border-zinc-100 flex items-center justify-center p-1">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-bold text-[#181211] text-[15px] leading-tight">{item.name}</h4>
                          <p className="text-zinc-400 text-xs mt-0.5 italic">Qty: {item.quantity}</p>
                          <div className="text-[var(--color-brand-red)] font-bold text-sm mt-1">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <div className="flex items-center gap-2 border border-zinc-100 bg-[#F8FAFC] rounded-2xl px-4 py-3 shadow-sm">
                    <Tag className="text-zinc-400 w-4 h-4 flex-shrink-0" />
                    <input 
                      type="text" 
                      value={promo}
                      onChange={e => setPromo(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleApplyPromo()}
                      placeholder="Promo code" 
                      className="flex-1 text-sm outline-none bg-transparent placeholder-zinc-400 text-[#0F172A]"
                    />
                    {promoApplied ? (
                      <button onClick={() => { setPromoApplied(null); setPromo(''); }} className="text-sm font-bold text-zinc-500 hover:text-zinc-700">Remove</button>
                    ) : (
                      <button onClick={handleApplyPromo} className="text-sm font-bold text-[var(--color-brand-red)] hover:opacity-80">Apply</button>
                    )}
                  </div>
                  {promoError && <p className="text-xs text-[var(--color-brand-red)] font-medium px-2 mt-1">{promoError}</p>}
                  {promoApplied && (
                    <div className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-lg text-xs font-semibold text-green-700 mt-2">
                      <span>"{promoApplied.code}" Applied</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Cost Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-zinc-100 pb-2">
                    <div className="flex justify-between text-sm text-[#475569]">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#0F172A]">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#475569]">
                      <span>Delivery</span>
                      <span className={deliveryFee > 0 ? "font-bold text-[#0F172A]" : "font-bold text-green-600"}>
                        {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fixed Bottom Row */}
          <div className="p-5 pt-3 flex items-center justify-between bg-white z-10 border-t border-zinc-50">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-[#0F172A] leading-tight">${total.toFixed(2)}</span>
              {discount > 0 && (
                <span className="bg-[#D1FAE5] text-[#047857] text-[10px] font-bold px-2.5 py-0.5 rounded-full w-fit uppercase tracking-widest mt-0.5">
                  SAVE ${discount.toFixed(2)}
                </span>
              )}
            </div>
            <button 
              onClick={handlePlaceOrder}
              className="bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              Place Secure Order <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
