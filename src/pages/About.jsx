import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, FlaskConical, Truck, Sprout, Heart, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-[var(--color-brand-red)]" />,
      title: "100% Organic",
      description: "Sustainably cultivated in controlled, organic environments. No pesticides, ever."
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-[var(--color-brand-red)]" />,
      title: "Lab Tested",
      description: "Rigorous third-party testing ensures purity, potency, and absolute safety."
    },
    {
      icon: <Zap className="w-8 h-8 text-[var(--color-brand-red)]" />,
      title: "Dual Extracted",
      description: "We use state-of-the-art dual extraction to maximize bioavailability."
    },
    {
      icon: <Truck className="w-8 h-8 text-[var(--color-brand-red)]" />,
      title: "Fast Delivery",
      description: "From our farm to your door with discreet, fast, and reliable shipping."
    }
  ];

  const timeline = [
    {
      year: "Phase 1",
      title: "Sustainable Cultivation",
      description: "We start by sourcing the finest spores and cultivating them on organic substrates in our state-of-the-art indoor farms.",
      icon: <Sprout className="w-6 h-6 text-white" />
    },
    {
      year: "Phase 2",
      title: "Precision Extraction",
      description: "Our proprietary dual-extraction method pulls out both water-soluble and fat-soluble active compounds for maximum potency.",
      icon: <FlaskConical className="w-6 h-6 text-white" />
    },
    {
      year: "Phase 3",
      title: "Quality Assurance",
      description: "Every batch undergoes strict HPLC analysis by independent labs to verify exact compound percentages.",
      icon: <ShieldCheck className="w-6 h-6 text-white" />
    },
    {
      year: "Phase 4",
      title: "Formulation & Delivery",
      description: "We carefully craft our final products—from gummies to capsules—and ship them directly to you for optimal wellness.",
      icon: <Heart className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F6] text-[#181211] font-sans selection:bg-[var(--color-brand-red)] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          {/* Abstract pattern or shape overlay could go here */}
          <div className="w-[800px] h-[800px] rounded-full bg-[var(--color-brand-red)] blur-[150px] absolute -top-[400px] -right-[400px]"></div>
        </div>
        
        <div className="max-w-[85%] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-[var(--color-brand-red)] font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              Elevating Mind & Body Through <span className="text-[var(--color-brand-red)]">Fungi.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-medium">
              We believe in the profound healing power of mushrooms. Our mission is to provide the purest, most potent functional fungi to help you live a more balanced life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Image Split Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[85%] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1596489371694-87895e691ec5?q=80&w=2070&auto=format&fit=crop" 
                  alt="Premium Mushrooms" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative block behind image */}
              <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-[var(--color-brand-red)] rounded-[2.5rem] z-0 hidden md:block"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">
                Rooted in <br/>Nature & Science.
              </h2>
              <div className="w-20 h-1.5 bg-[var(--color-brand-red)] rounded-full"></div>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Funguyz was born out of a profound respect for ancient wellness traditions and a commitment to modern scientific rigor. We recognized a gap in the market for truly transparent, high-quality functional mushroom products.
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Whether you're looking to sharpen your focus with Lion's Mane, boost your immune system with Turkey Tail, or find calm with Reishi, our extracts are meticulously crafted to deliver measurable results you can feel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-24 bg-[#F8F6F6]">
        <div className="max-w-[85%] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">The Funguyz Standard</h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">We refuse to compromise on quality. Here is why our products stand above the rest.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-zinc-100 hover:border-[var(--color-brand-red)]/20 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-[var(--color-brand-red)]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WAVY DIVIDER: Why Choose Us (Light) to Process (Dark) */}
      <div className="w-full overflow-hidden leading-[0] bg-[#F8F6F6] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.12" />
          <path d="M0,75 C300,35 600,100 900,45 C1050,15 1120,55 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.1" />
          <path d="M0,88 C250,55 550,95 850,55 C1000,35 1100,70 1200,62 L1200,120 L0,120 Z" fill="#0F172A" />
        </svg>
      </div>

      {/* Process / Timeline */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-[85%] mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Process</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">From spore to extract, transparency at every step.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {timeline.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-[var(--color-brand-red)] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-brand-red)]/20 ring-8 ring-[#0F172A]">
                    {item.icon}
                  </div>
                  <span className="text-[var(--color-brand-red)] font-bold text-sm tracking-widest uppercase mb-2 block">{item.year}</span>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WAVY DIVIDER: Process (Dark) to CTA (Red) */}
      <div className="w-full overflow-hidden leading-[0] bg-[#0F172A] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#ffffff" opacity="0.12" />
          <path d="M0,75 C300,35 600,100 900,45 C1050,15 1120,55 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.1" />
          <path d="M0,88 C250,55 550,95 850,55 C1000,35 1100,70 1200,62 L1200,120 L0,120 Z" fill="var(--color-brand-red)" />
        </svg>
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-[var(--color-brand-red)] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor"></circle>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to experience the difference?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
              Join thousands of others who have unlocked their potential with our premium mushroom extracts.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-white text-[var(--color-brand-red)] hover:bg-zinc-100 font-black text-lg py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              Shop Collection <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
