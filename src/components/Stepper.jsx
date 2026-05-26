import React from 'react';
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const steps = [
  // { id: 1, label: 'Shopping Cart', icon: ShoppingCart },
  { id: 2, label: 'Checkout', icon: CreditCard },
  { id: 3, label: 'Order Complete', icon: CheckCircle },
];

export default function Stepper({ currentStep }) {
  const navigate = useNavigate();

  const handleStepClick = (stepId) => {
    if (stepId < currentStep) {
      if (stepId === 1) navigate('/cart');
      if (stepId === 2) navigate('/checkout');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-6 pb-14 sm:pb-16 px-4 sm:px-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div 
                onClick={() => handleStepClick(step.id)}
                className={`relative flex flex-col items-center z-10 ${step.id < currentStep ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                  {/* Continuous Ripple Effect for Active Step */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1.8], opacity: [0, 0.3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-[var(--color-brand-red)] z-0 pointer-events-none"
                    />
                  )}

                  {/* Circle */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                    className={`relative z-10 w-full h-full rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive || isPast
                        ? 'bg-[var(--color-brand-red)] text-white shadow-[0_4px_10px_rgba(255,20,147,0.3)] border-2 border-[var(--color-brand-red)]'
                        : 'bg-white border-[3px] border-[#CBD5E1] text-[#94A3B8]'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </div>
                
                {/* Label */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3, type: "spring", stiffness: 300, damping: 24 }}
                  className={`absolute top-[56px] sm:top-[66px] w-32 sm:w-40 text-center text-[10px] sm:text-[12px] font-bold uppercase tracking-wide transition-colors duration-300 ${
                    isActive || isPast ? 'text-[var(--color-brand-red)]' : 'text-[#64748B]'
                  }`}
                >
                  {step.label}
                </motion.div>
              </div>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4 h-[3px] sm:h-[4px] bg-[#E2E8F0] relative rounded-full overflow-hidden z-0">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isPast ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease: "circInOut", delay: idx * 0.2 }}
                    className="absolute left-0 top-0 bottom-0 bg-[var(--color-brand-red)]"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
