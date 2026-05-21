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
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 text-white">
      <div className="max-w-[85%] mx-auto px-4">
        
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
                  className="bg-white rounded-2xl shadow-md p-3 flex flex-col sm:flex-row items-center gap-6 text-white"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-[#E2E8F0]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-1 text-[#0F172A]">{item.name}</h3>
                    <p className="text-[#475569] text-sm mb-4">{item.description}</p>
                    <div className="text-[var(--color-brand-red)] font-black text-xl">${item.price.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 bg-[#F8FAFC] rounded-full px-4 py-2 border border-[#CBD5E1]">
                      <button onClick={() => handleUpdateQuantityWrapper(item.id, -1)} className="text-[#64748B] hover:text-[var(--color-brand-red)] transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-4 text-center text-[#0F172A]">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantityWrapper(item.id, 1)} className="text-[#64748B] hover:text-[var(--color-brand-red)] transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-zinc-400 hover:text-[var(--color-brand-red)] transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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
    </div>
  );
}
