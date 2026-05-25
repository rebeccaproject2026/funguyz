import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AnnouncementTicker from './AnnouncementTicker'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import LoginDrawer from './LoginDrawer'
import AddedToBagToast from './AddedToBagToast'
import Lenis from 'lenis'
import { useCart } from '../context/CartContext'

import main5 from '../assets/main5.jpg'
import main1 from '../assets/main1.jpg'

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Toast state
  const [toast, setToast] = useState({ visible: false, item: null })
  const toastTimerRef = useRef(null)
  
  // Store Lenis instance
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    handleAddToCart,
    handleRemoveItem,
    handleUpdateQuantity,
    wishlistCount,
    handleAddToWishlist
  } = useCart()

  // Toast implementation wrapper
  const handleAddToCartWithToast = (product) => {
    handleAddToCart(product)
    
    // Show toast — stays open until manually closed
    const addedItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.size || 'Whole',
      image: product.image
    }
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ visible: true, item: addedItem })
  }

  // CTA Shop Now action -> navigate to /productlist
  const handleShopNowClick = () => {
    navigate('/productlist')
  }

  return (
    <div className="overflow-hidden bg-white text-brand-dark overflow-x-hidden relative flex flex-col font-sans">
      
      {/* Announcement Scrolling Marquee */}
      <AnnouncementTicker />

      {/* Dynamic Header */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        cartSubtotal={cartSubtotal}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet context={{ handleShopNowClick, handleAddToCart: handleAddToCartWithToast, handleAddToWishlist }} />
      </main>

      {/* Footer Banner */}
      <Footer />

      {/* Interactive Sliders / Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <LoginDrawer
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Added to Bag Toast */}
      <AddedToBagToast
        item={toast.item}
        subtotal={cartSubtotal}
        isVisible={toast.visible}
        onClose={() => setToast({ visible: false, item: null })}
        onViewCart={() => setIsCartOpen(true)}
      />

    </div>
  )
}
