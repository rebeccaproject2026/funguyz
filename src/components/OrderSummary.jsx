import React, { useState } from 'react';
import { Package, Tag, ShieldCheck, Truck, FlaskConical, ArrowRight, Minus, Plus, Check, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Select from './Select';

export default function OrderSummary({
  subtotal,
  tax,
  deliveryFee = 0,
  discount = 0,
  total,
  
  deliveryMethod = 'sameday',
  setDeliveryMethod,
  
  promoCode = '',
  setPromoCode,
  promoError = '',
  promoApplied = null,
  onApplyPromo,
  onRemovePromo,
  
  cartItems = [],
  onUpdateQuantity,
  
  showItems = false,
  showDeliveryMethod = false,
  showTerms = false,
  deliveryType = 'sameday',
  
  paymentMethod = 'card',
  setPaymentMethod,

  buttonText = "Proceed",
  buttonIcon: ButtonIcon,
  onButtonClick
}) {
  const [showETransferModal, setShowETransferModal] = useState(false);

  // Fallback if component is used without payment method prop
  const [localPaymentMethod, setLocalPaymentMethod] = useState('cod');
  const activePaymentMethod = paymentMethod || localPaymentMethod;
  const handlePaymentChange = setPaymentMethod || setLocalPaymentMethod;
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleButtonClick = () => {
    // if (showTerms && !termsAccepted) {
    //   alert("Please accept the terms and conditions.");
    //   return;
    // }
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-md sticky top-32 flex flex-col gap-3">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-full bg-[var(--color-brand-red)]/10 flex items-center justify-center">
          <Package className="text-[var(--color-brand-red)] w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-[#181211]">Order Summary</h2>
      </div>

      {showItems && cartItems && cartItems.length > 0 && (
        <div className="space-y-6 mb-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-[#CBD5E1] overflow-hidden flex-shrink-0 p-1">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="flex-1 flex flex-col justify-center py-0.5">
                <h3 className="font-semibold text-base line-clamp-1 text-[#0F172A]">{item.name}</h3>
                <p className="text-[#475569] text-xs mt-0.5">{item.description}</p>
                
                <div className="flex justify-between items-center mt-auto pt-2">
                  <div className="font-bold text-[var(--color-brand-red)] text-lg">${item.price.toFixed(2)}</div>
                  
                  <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-full px-2 py-1 border border-[#CBD5E1]">
                    <button 
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, -1)}
                      className="text-[#64748B] hover:text-[#0F172A] transition-colors px-1 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm text-[#0F172A] w-3 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, 1)}
                      className="bg-[var(--color-brand-red)] text-white rounded-[4px] p-0.5 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeliveryMethod && setDeliveryMethod && (
        <div className='border-t border-[#CBD5E1] pt-2 mt-1'>
            <p className="text-sm font-bold text-[#334155] mb-2">Delivery Method</p>
            <div className="flex flex-col gap-2">
              <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${deliveryMethod === 'sameday' ? 'border-[var(--color-brand-red)] bg-[var(--color-brand-red)]/5' : 'border-zinc-200'}`}>
                <div className="flex items-center gap-2">
                  <input type="radio" name="delivery" checked={deliveryMethod === 'sameday'} onChange={() => setDeliveryMethod('sameday')} className="accent-[var(--color-brand-red)] w-4 h-4" />
                  <span className="text-sm font-bold text-zinc-800">Same Day Delivery</span>
                </div>
                <span className="text-xs font-bold text-green-600">FREE</span>
              </label>
              <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${deliveryMethod === 'express' ? 'border-[var(--color-brand-red)] bg-[var(--color-brand-red)]/5' : 'border-zinc-200'}`}>
                <div className="flex items-center gap-2">
                  <input type="radio" name="delivery" checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')} className="accent-[var(--color-brand-red)] w-4 h-4" />
                  <span className="text-sm font-bold text-zinc-800">Express (1-2 Hours)</span>
                </div>
                <span className="text-xs font-bold text-[#475569]">$5.00</span>
              </label>
            </div>
        </div>
      )}

      <div className="flex flex-col gap-3 py-2 border-t border-[#CBD5E1] mt-2">
        <div className="flex justify-between text-[15px] text-[#475569]">
          <span>Subtotal</span>
          <span className="text-[#0F172A] font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[15px] text-[#475569]">
          <span>FUNGUYZ CA$H <span className="italic text-[13px]">(Available $)</span></span>
          <a href="#" className="text-[var(--color-brand-red)] underline font-medium hover:text-[#FF1493]/80">Inactive</a>
        </div>
        <div className="flex justify-between text-[15px] text-[#475569]">
          <span>Coupon</span>
          <span className="text-[#0F172A] font-bold">${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[15px] text-[#475569]">
          <span>Delivery Fee</span>
          <span className="text-[#0F172A] font-bold">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[15px] text-[#475569]">
          <span className="flex items-center gap-1">Total Saving</span>
          <span className="text-[#0F172A] font-bold">${discount.toFixed(2)}</span>
        </div>
        
        {/* Total block moved up to match screenshot */}
        <div className="border-t border-[#CBD5E1] my-2 pt-3 flex justify-between font-bold text-[#0F172A] text-[17px]">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="relative flex items-center gap-2 border border-[#CBD5E1] bg-[#F8FAFC] rounded-xl px-3 py-2">
          <Tag className="text-zinc-400 w-4 h-4 flex-shrink-0" />
          <div className="flex-1 static">
            <Select 
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              options={[
                { value: "", label: "No Coupon Selected" },
                { value: "SHROOM10", label: "SHROOM10 - $15 OFF" },
                { value: "SAVE15", label: "SAVE15 - $15 OFF" },
                { value: "WELCOME20", label: "WELCOME20 - $15 OFF" }
              ]}
              className="!bg-transparent !border-none !shadow-none !text-[#0F172A] !px-0 hover:!border-none !min-h-0"
              placeholder="Select Promo Code"
              lightTheme={true}
              hideChevron={true}
              customStyle="!static"
              dropdownClassName="!top-[calc(100%+4px)] !w-full !left-0 !mt-0"
            />
          </div>
          <button onClick={onApplyPromo} className="text-sm font-bold text-[var(--color-brand-red)] hover:opacity-80">Apply</button>
        </div>
        {promoError && <p className="text-xs text-[var(--color-brand-red)] font-medium px-1">{promoError}</p>}
        {promoApplied && (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <span className="text-xs font-semibold text-green-700">✓ "{promoApplied.code}" applied</span>
                <button onClick={onRemovePromo} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">✕</button>
            </div>
        )}
      </div>

      {/* Payment Method Selector */}
      {handlePaymentChange && (
        <div className="">
          <p className="text-[17px] font-bold text-[#0F172A] mb-3">Payment Options</p>
          
          {/* Payment Method Tabs */}
          <div className="flex gap-2 mb-2">
            <button 
              onClick={() => handlePaymentChange('etransfer')}
              className={`flex items-center justify-center gap-1.5 p-2 flex-1 h-[50px] rounded-lg border-2 font-bold transition-all ${activePaymentMethod === 'etransfer' ? 'border-[var(--color-brand-red)] bg-[var(--color-brand-red)]/5 text-[var(--color-brand-red)] shadow-[0_4px_12px_rgba(255,20,147,0.1)]' : 'border-zinc-300 hover:bg-zinc-50 text-zinc-600 hover:border-zinc-400'}`}
            >
              <Icon icon="mdi:cash-fast" className="w-6 h-7 flex-shrink-0" />
              <span className="text-sm">E-transfer</span>
            </button>
            <button 
              onClick={() => handlePaymentChange('card')}
              className={`flex items-center justify-center gap-1.5 p-2 flex-1 h-[50px] rounded-lg border-2 font-bold transition-all ${activePaymentMethod === 'card' ? 'border-[var(--color-brand-red)] bg-[var(--color-brand-red)]/5 text-[var(--color-brand-red)] shadow-[0_4px_12px_rgba(255,20,147,0.1)]' : 'border-zinc-300 hover:bg-zinc-50 text-zinc-600 hover:border-zinc-400'}`}
            >
              <Icon icon="mdi:credit-card-outline" className="w-6 h-7 flex-shrink-0" />
              <span className="text-sm">Credit Card</span>
            </button>
            <button 
              onClick={() => handlePaymentChange('cod')}
              className={`flex items-center justify-center gap-1.5 p-2 flex-1 h-[50px] rounded-lg border-2 font-bold transition-all ${activePaymentMethod === 'cod' ? 'border-[var(--color-brand-red)] bg-[var(--color-brand-red)]/5 text-[var(--color-brand-red)] shadow-[0_4px_12px_rgba(255,20,147,0.1)]' : 'border-zinc-300 hover:bg-zinc-50 text-zinc-600 hover:border-zinc-400'}`}
            >
              <Icon icon="mdi:truck-delivery-outline" className="w-6 h-7 flex-shrink-0" />
            <span className="text-sm">Cash/Delivery</span>
            </button>
          </div>

          {/* Dynamic Content Area */}
          {activePaymentMethod !== 'cod' && (
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-4 transition-all">
              {activePaymentMethod === 'etransfer' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-white border border-[var(--color-brand-red)]/30 rounded-lg p-4 shadow-sm">
                    <h4 className="font-bold text-[15px] text-[#0F172A] mb-3 border-b pb-2 border-zinc-100 flex items-center gap-2">
                      <Icon icon="mdi:information-outline" className="w-5 h-5 text-[var(--color-brand-red)]" />
                      E-Transfer Instructions
                    </h4>
                    <div className="text-[13px] text-zinc-700 space-y-3">
                      <div className="flex gap-2.5">
                        <span className="font-black text-[var(--color-brand-red)]">1.</span>
                        <p>Log into your bank's app/site → E-Transfer.</p>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="font-black text-[var(--color-brand-red)]">2.</span>
                        <div>
                          <p><strong>Recipient Name:</strong> FUNGUYZ</p>
                          <p><strong>Email:</strong> <span className="font-bold text-[#0F172A]">admin123@gmail.com</span></p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="font-black text-[var(--color-brand-red)]">3.</span>
                        <p><strong>Security Question:</strong> Funguyz + last 4 digits of your Order # (ex: Funguyz1234)</p>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="font-black text-[var(--color-brand-red)]">4.</span>
                        <p><strong>Security Answer:</strong> Health</p>
                      </div>
                      
                      <div className="bg-red-50 text-red-800 p-2.5 rounded text-[12px] font-semibold mt-3 border border-red-100 leading-snug">
                        ⚠️ Please <span className="underline">do not</span> put the same question as your previous order, and <span className="underline">no product mentions</span> in the name, message, or answer.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePaymentMethod === 'card' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                   {/* Card Fields */}
                   <div className="space-y-4">
                     <div>
                       <label className="text-sm font-bold text-[#0F172A] block mb-1">Card Number</label>
                       <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white font-mono placeholder-gray-400" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-sm font-bold text-[#0F172A] block mb-1">Expiry Date</label>
                         <input type="text" placeholder="MM/YY" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white font-mono placeholder-gray-400" />
                       </div>
                       <div>
                         <label className="text-sm font-bold text-[#0F172A] block mb-1">CVC</label>
                         <input type="text" placeholder="123" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[var(--color-brand-red)] focus:ring-1 focus:ring-[var(--color-brand-red)] transition-all bg-white font-mono placeholder-gray-400" />
                       </div>
                     </div>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Express Minimum Banner */}
      {deliveryType === 'express' && subtotal < 120 && (
        <div className="mt-3 bg-red-100 border border-red-300 text-red-600 p-3 rounded text-center text-sm">
          Minimum order for Express Delivery is $120. <a href="/" className="underline font-bold hover:text-red-700">Add More Items</a> to continue.
        </div>
      )}

      {/* Terms & Conditions Checkbox */}
      {showTerms && (
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[var(--color-brand-red)]" />
          <span className="text-sm text-[#475569]">By checking this you're agree to our <a href="#" className="text-[#3b82f6] underline hover:text-blue-600">order policy</a></span>
        </label>
      )}

      <button 
        onClick={handleButtonClick}
        className="hidden md:flex w-full bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold py-3.5 rounded-full transition-all items-center justify-center gap-2 cursor-pointer shadow-md mt-1"
      >
        {ButtonIcon && <ButtonIcon className="w-5 h-5" />}
        {buttonText}
      </button>
    </div>
  );
}
