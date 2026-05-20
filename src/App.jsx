import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
// import Faq from './pages/Faq'
// import ContactUs from './pages/ContactUs'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          {/* <Route path="faq" element={<Faq />} />
          <Route path="contact-us" element={<ContactUs />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}
