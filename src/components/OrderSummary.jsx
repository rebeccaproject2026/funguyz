import React, { useState } from 'react';
import { Package, Tag, ShieldCheck, Truck, FlaskConical, ArrowRight, Minus, Plus } from 'lucide-react';

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
  
  buttonText = "Proceed",
  buttonIcon: ButtonIcon,
  onButtonClick
}) {
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
    <div className="bg-white p-5 rounded-3xl border border-[#CBD5E1] shadow-md sticky top-32 flex flex-col gap-3">
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
          <span>Delivery</span>
          <span className={deliveryFee > 0 ? "text-[#0F172A] font-bold" : "text-green-600 font-bold uppercase"}>
            {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
          </span>
        </div>
        <div className="flex justify-between text-[15px] text-[#475569]">
          <span>Estimated Taxes</span>
          <span className="text-[#0F172A] font-bold">${tax.toFixed(2)}</span>
        </div>
        {!showDeliveryMethod && promoApplied && (
           <div className="flex justify-between text-[15px] text-green-600 mt-1">
              <span>Promo ({promoApplied.code})</span>
              <span className="font-bold">-${discount.toFixed(2)}</span>
           </div>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center gap-2 border border-[#CBD5E1] bg-[#F8FAFC] rounded-xl px-3 py-2">
          <Tag className="text-zinc-400 w-4 h-4" />
          <input 
            type="text" 
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onApplyPromo && onApplyPromo()}
            placeholder="Promo code" 
            className="flex-1 text-sm outline-none bg-transparent placeholder-zinc-400 text-[#0F172A]"
          />
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

      <div className="border-t border-[#CBD5E1] pt-4 mt-2 hidden md:block">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-[#0F172A]">Total</span>
          <div className="flex items-center gap-3">
            {discount > 0 && (
               <span className="text-xs bg-green-50 text-green-600 font-bold px-2 py-1 rounded-lg">
                  Save ${discount.toFixed(2)}
               </span>
            )}
            <span className="text-3xl font-black text-[var(--color-brand-red)]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
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
