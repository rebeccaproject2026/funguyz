import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, label: 'Shopping Cart' },
  { id: 2, label: 'Checkout' },
  { id: 3, label: 'Order Complete' },
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
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 pt-2 pb-10 w-full px-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">
      {steps.map((step, idx) => {
        const isActive = currentStep === step.id;
        const isPast = currentStep > step.id;

        return (
          <React.Fragment key={step.id}>
            <motion.div 
              onClick={() => handleStepClick(step.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`transition-colors ${
                step.id < currentStep ? 'cursor-pointer hover:text-[var(--color-brand-red)]/80' : 'cursor-default'
              } ${
                isActive ? 'text-[var(--color-brand-red)]' : 'text-zinc-500'
              }`}
            >
              {step.label}
            </motion.div>

            {idx < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.1 }}
              >
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
