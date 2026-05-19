import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AnnouncementTicker from './AnnouncementTicker'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import LoginDrawer from './LoginDrawer'
import Lenis from 'lenis'

import main5 from '../assets/main5.jpg'
import main7 from '../assets/main7.jpg'
import main1 from '../assets/main1.jpg'

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(2)

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

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Pre-load cart with two premium reserve mushroom products
  const [cartItems, setCartItems] = useState([
    {
      id: 201,
      name: 'Golden Teacher Magic Mushrooms (AAA)',
      price: 49.99,
      quantity: 1,
      size: 'Whole',
      color: 'Signature Red Label',
      image: main5
    },
    {
      id: 203,
      name: 'Premium Mind-Focus Microdose Caps',
      price: 39.99,
      quantity: 1,
      size: '30 Caps',
      color: 'Vegan Cellulose',
      image: main7
    }
  ])

  // Calculate stats
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Actions
  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          size: product.size || 'Whole',
          color: product.color || 'Signature Red',
          image: product.image
        }
      ]
    })
    setIsCartOpen(true)
  }

  // CTA Shop Now action -> adds the cryogenic reserve shrooms package to cart and slides drawer open!
  const handleShopNowClick = () => {
    const reservePackage = {
      id: 204,
      name: 'Freeze Dried Amazonian Cryo-Shrooms',
      price: 64.99,
      size: 'Whole',
      color: 'Premium Reserve',
      image: main1
    }
    handleAddToCart(reservePackage)
  }

  const handleAddToWishlist = () => {
    setWishlistCount((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark overflow-x-hidden relative flex flex-col font-sans">
      
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
        <Outlet context={{ handleShopNowClick, handleAddToCart, handleAddToWishlist }} />
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

    </div>
  )
}
