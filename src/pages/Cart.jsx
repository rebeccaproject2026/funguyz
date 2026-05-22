import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Stepper from '../components/Stepper';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, cartTax, cartTotal, handleRemoveItem, handleUpdateQuantity } = useCart();
  
  const [delivery, setDelivery] = useState('sameday');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState('');

  const PROMO_CODES = {
      'SHROOM10': { discount: 10, type: 'percent', label: '10% off' },
      'SAVE15': { discount: 15, type: 'flat', label: '$15 off' },
      'WELCOME20': { discount: 20, type: 'percent', label: '20% off' },
  };

  const handleApplyPromo = () => {
      const code = promo.trim().toUpperCase();
      if (!code) {
          setPromoError('Invalid promo code.');
          return;
      }
      if (PROMO_CODES[code]) {
          setPromoApplied({ code, ...PROMO_CODES[code] });
          setPromoError('');
      } else {
          setPromoApplied(null);
          setPromoError('Invalid promo code. Try SHROOM10, SAVE15 or WELCOME20.');
      }
  };

  const handleUpdateQuantityWrapper = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      handleUpdateQuantity(id, Math.max(1, item.quantity + delta));
    }
  };

  const deliveryFee = delivery === 'express' ? 5 : 0;
  const discount = promoApplied
      ? promoApplied.type === 'percent'
          ? +(cartSubtotal * promoApplied.discount / 100).toFixed(2)
          : promoApplied.discount
      : 0;
  const total = cartTotal + deliveryFee - discount;

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-32 md:pb-20 text-white">
      <div className="w-full lg:max-w-[85%] mx-auto px-4 sm:px-6">
        
        <Stepper currentStep={1} />

        {cartItems.length === 0 ? (
          <div className="bg-[#131313] border border-zinc-800 rounded-3xl p-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-zinc-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-8 space-y-6"
            >
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-4 flex gap-4 border border-zinc-100 relative shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="mb-2">
                          <span className="bg-[#FFF0F5] text-[var(--color-brand-red)] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                            Best Seller
                          </span>
                        </div>
                        <h3 className="text-[17px] font-bold text-[#0F172A] leading-tight">{item.name}</h3>
                        <p className="text-[#64748B] text-[13px] mt-1 line-clamp-1">{item.description}</p>
                      </div>
                      
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-zinc-400 hover:text-[var(--color-brand-red)] transition-colors p-1"
                      >
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-full px-2 py-1.5 border border-[#E2E8F0]">
                        <button onClick={() => handleUpdateQuantityWrapper(item.id, -1)} className="text-[#64748B] hover:text-[var(--color-brand-red)] transition-colors px-1.5">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold w-4 text-center text-[13px] text-[#0F172A]">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantityWrapper(item.id, 1)} className="text-white hover:opacity-80 transition-opacity bg-[var(--color-brand-red)] rounded-full p-1 ml-1 cursor-pointer">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[#0F172A] font-black text-lg">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="lg:col-span-4"
            >
                <OrderSummary 
                    subtotal={cartSubtotal}
                    tax={cartTax}
                    deliveryFee={deliveryFee}
                    discount={discount}
                    total={total}
                    deliveryMethod={delivery}
                    setDeliveryMethod={setDelivery}
                    promoCode={promo}
                    setPromoCode={setPromo}
                    promoError={promoError}
                    promoApplied={promoApplied}
                    onApplyPromo={handleApplyPromo}
                    onRemovePromo={() => { setPromoApplied(null); setPromo(''); }}
                    showDeliveryMethod={true}
                    buttonText="Proceed to Checkout"
                    buttonIcon={ArrowRight}
                    onButtonClick={() => navigate('/checkout')}
                />
            </motion.div>

          </div>
        )}
      </div>
      
      {/* Mobile Sticky Footer */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#F4F1EB] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-5 md:hidden z-50 flex items-center justify-between rounded-t-3xl border-t border-white/20">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-[#0F172A] leading-tight">${total.toFixed(2)}</span>
            {discount > 0 && (
              <span className="bg-[#D1FAE5] text-[#047857] text-[10px] font-bold px-2.5 py-0.5 rounded-full w-fit uppercase tracking-widest mt-0.5">
                SAVE ${discount.toFixed(2)}
              </span>
            )}
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
