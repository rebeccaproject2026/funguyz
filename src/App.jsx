import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Faq from './pages/Faq'
// import ContactUs from './pages/ContactUs'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import OrderComplete from './pages/OrderComplete'
import TrackOrder from './pages/TrackOrder'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="faq" element={<Faq />} />
            {/* <Route path="contact-us" element={<ContactUs />} /> */}
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-complete" element={<OrderComplete />} />
            <Route path="track-order" element={<TrackOrder />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  )
}
