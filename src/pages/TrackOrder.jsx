import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Truck, MapPin, Home, User, Star, Phone, Headphones, Shield, ChevronDown, ChevronUp } from 'lucide-react';

export default function TrackOrder() {
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

  const [showSummary, setShowSummary] = useState(false);

  const orderStatus = {
    estimatedDelivery: '07:55 PM',
    orderId: 'FGZ-84729',
    driverStatus: 'Driver is 5 minutes away',
    deliveryStatus: 'Out for Delivery',
    address: state.form?.address || '123 Mushroom Lane',
    city: `${state.form?.city || 'Mycology City'}, ${state.form?.state || 'NY'} ${state.form?.zip || '10001'}`,
    recipient: state.form?.fullName || 'John Doe',
    phone: state.form?.phone || '+1 (555) 000-0000',
  };

  const driver = {
    name: 'Marcus Sterling',
    rating: '4.9',
    orders: '2.4k orders',
  };

  return (
    <div className="bg-[#F8F6F6] min-h-screen pb-6 sm:pb-32 lg:pb-10 pt-24 text-[#181211]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">

        {/* Mobile Back Header */}
        <button
          onClick={() => navigate('/')}
          className="lg:hidden flex items-center gap-2 text-[var(--color-brand-red)] font-bold mb-6 group active:scale-95 transition-transform cursor-pointer"
        >
          <span className="text-[17px]">← Continue Shopping</span>
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-[70%_30%] gap-6">
          
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Status Card (Stepper) */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl lg:text-2xl font-black text-[#181211] leading-tight">{orderStatus.driverStatus}</h2>
                  <p className="text-[13px] lg:text-sm text-[#475569] mt-1.5 font-medium">
                    Estimated delivery: {orderStatus.estimatedDelivery}&nbsp;•&nbsp;Order #{orderStatus.orderId}
                  </p>
                </div>
                <span className="w-fit px-5 py-2 bg-[var(--color-brand-red)]/5 border border-[var(--color-brand-red)]/10 text-[var(--color-brand-red)] rounded-2xl text-[13px] font-bold uppercase tracking-wider">
                  {orderStatus.deliveryStatus}
                </span>
              </div>

              {/* Responsive Stepper */}
              <div className="relative flex items-center justify-between mt-10 mb-2 px-2">
                <div className="absolute top-[18px] left-[10%] right-[10%] h-[3px] bg-[#F1F1F1] z-0 rounded-full" />
                <div className="absolute top-[18px] left-[10%] w-[55%] h-[3px] bg-[var(--color-brand-red)] z-0 rounded-full" />

                {[
                  { label: 'Order Placed', icon: Check, status: 'completed' },
                  { label: 'Processing', icon: Check, status: 'completed' },
                  { label: 'Out for Delivery', icon: Truck, status: 'active' },
                  { label: 'Delivered', icon: Home, status: 'pending' },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.status === 'completed' ? 'bg-[var(--color-brand-red)] text-white shadow-lg shadow-red-200' :
                      step.status === 'active' ? 'bg-[var(--color-brand-red)] text-white shadow-lg shadow-red-200 scale-110' :
                      'bg-white border-2 border-[#F1F1F1] text-gray-300'
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] lg:text-xs font-bold mt-4 whitespace-nowrap ${
                      step.status === 'pending' ? 'text-gray-400' :
                      step.status === 'active' ? 'text-[var(--color-brand-red)]' : 'text-[#181211]'
                    }`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-gray-100" style={{ height: '500px' }}>
              <iframe
                title="Delivery Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5200%2C37.7000%2C-122.3500%2C37.8100&layer=mapnik"
              />

              {/* Driver Floating Card (Desktop Only) */}
              <div className="hidden lg:flex absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 items-center justify-between shadow-2xl border border-white/20 ml-2">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#181211] flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                    <User className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#475569] font-bold uppercase tracking-wider">Your Delivery Partner</p>
                    <p className="text-lg font-black text-[#181211]">{driver.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star className="text-[#FFB800] w-4 h-4 fill-current" />
                      <span className="text-sm text-[#475569] font-bold">{driver.rating} ({driver.orders})</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-[var(--color-brand-red)] text-white px-8 h-12 rounded-full font-bold hover:bg-[var(--color-brand-red-hover)] transition-all shadow-lg shadow-red-500/20 cursor-pointer active:scale-95">
                  <Phone className="w-5 h-5" />
                  Call Driver
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-6 h-full">

            {/* Delivery Details */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50">
              <h3 className="text-lg font-bold text-[#181211] mb-6">Delivery Details</h3>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-red)]/5 flex items-center justify-center shrink-0 border border-[var(--color-brand-red)]/10">
                  <MapPin className="text-[var(--color-brand-red)] w-6 h-6" />
                </div>
                <div className="pt-0.5">
                  <p className="text-[11px] text-[#475569] font-bold uppercase tracking-wide mb-1">Address</p>
                  <p className="text-[15px] font-bold text-[#181211] leading-tight">{orderStatus.address}</p>
                  <p className="text-sm text-[#475569] mt-0.5">{orderStatus.city}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-red)]/5 flex items-center justify-center shrink-0 border border-[var(--color-brand-red)]/10">
                  <User className="text-[var(--color-brand-red)] w-6 h-6" />
                </div>
                <div className="pt-0.5">
                  <p className="text-[11px] text-[#475569] font-bold uppercase tracking-wide mb-1">Recipient</p>
                  <p className="text-[15px] font-bold text-[#181211] leading-tight">{orderStatus.recipient}</p>
                  <p className="text-sm text-[#475569] mt-0.5 font-medium">{orderStatus.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Summary (Desktop only in this column) */}
            <div className="hidden lg:flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex-1 min-h-0">
              <h3 className="text-lg font-bold text-[#181211] mb-6 shrink-0">Order Summary</h3>
              <div className="space-y-4 flex-1 overflow-y-auto pr-2 min-h-0 custom-scrollbar">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-[#E2E8F0]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-[#0F172A] leading-tight">{item.name}</h4>
                      <p className="text-[#475569] text-xs mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-[var(--color-brand-red)] text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E2E8F0] pt-4 mt-4 space-y-2 shrink-0">
                <div className="flex justify-between text-sm text-[#475569]">
                  <span>Subtotal</span>
                  <span className="text-[#0F172A] font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#475569]">
                  <span>Delivery</span>
                  <span className={deliveryFee > 0 ? "text-[#0F172A] font-bold" : "text-green-600 font-bold uppercase"}>
                    {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#475569]">
                  <span>Estimated Tax</span>
                  <span className="text-[#0F172A] font-bold">${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-[#E2E8F0] mt-2">
                  <span className="text-lg font-bold text-[#0F172A]">Total</span>
                  <span className="text-2xl font-black text-[var(--color-brand-red)]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Persistent Footer (Checkout-Style Drawer) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 flex flex-col shadow-[0_-12px_30px_-5px_rgba(0,0,0,0.08)] transition-all duration-300 ${showSummary ? 'bg-white pb-6' : 'bg-white/95 backdrop-blur-xl'}`}>
        {/* Drawer Header (Clickable) */}
        <div
          onClick={() => setShowSummary(!showSummary)}
          className="flex items-center justify-between px-6 pt-4 pb-4 cursor-pointer"
        >
          <span className="text-[13px] font-bold text-[#181211] tracking-wide uppercase">Order Summary</span>
          {showSummary ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronUp className="w-5 h-5 text-gray-500" />}
        </div>

        {/* Full Breakdown Content Area */}
        <div className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${showSummary ? 'max-h-[85vh] pb-6' : 'max-h-0'}`}>
          <div className="flex flex-col gap-6 pt-2">
            {/* Items List */}
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {orderItems.map((i, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 shadow-sm">
                    <img src={i.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-bold text-[#181211] leading-tight truncate">{i.name}</p>
                      <span className="text-sm font-black text-[#181211]">${(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-[11px] text-[#475569] mt-0.5 font-medium italic">Qty: {i.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Breakdown Rows */}
            <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-50">
              <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                <span>Delivery</span>
                <span className={deliveryFee > 0 ? "text-gray-900 font-bold" : "text-green-600 font-bold uppercase"}>
                  {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
                </span>
              </div>
              <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                <span>Estimated Taxes</span>
                <span className="text-gray-900 font-bold">${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[13px] text-green-600 font-medium">
                  <span>Discount</span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Partner Action Bar */}
        <div className="px-5 pt-2 pb-4 flex items-center justify-between gap-4 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#181211] flex items-center justify-center shrink-0 border border-white shadow-sm">
              <User className="text-white w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#475569] font-bold uppercase leading-none mb-0.5">Your Delivery Partner</p>
              <p className="text-[15px] font-black text-[#181211] truncate">{driver.name}</p>
              <div className="flex items-center gap-1">
                <Star className="text-[#FFB800] w-3 h-3 fill-current" />
                <span className="text-[11px] text-[#475569] font-bold">{driver.rating} ({driver.orders})</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.open(`tel:${orderStatus.phone}`)}
            className="flex items-center gap-2 bg-[var(--color-brand-red)] text-white px-7 h-11 rounded-[14px] text-sm font-bold shadow-lg shadow-red-500/20 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
            Call
          </button>
        </div>
      </div>
    </div>
  );
}
