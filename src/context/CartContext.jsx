import React, { createContext, useContext, useState } from 'react';
import main5 from '../assets/main5.jpg';
import main7 from '../assets/main7.jpg';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
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
  ]);

  const [wishlistCount, setWishlistCount] = useState(2);

  // Actions
  const handleRemoveItem = (id) => {
    // API Integration point: e.g. axios.delete(`/api/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    // API Integration point: e.g. axios.patch(`/api/cart/${id}`, { quantity })
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleAddToCart = (product) => {
    // API Integration point: e.g. axios.post('/api/cart', product)
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
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
      ];
    });
  };

  const clearCart = () => {
    // API Integration point: e.g. axios.delete('/api/cart')
    setCartItems([]);
  };

  const handleAddToWishlist = () => {
    // API Integration point: e.g. axios.post('/api/wishlist', { ... })
    setWishlistCount((prev) => prev + 1);
  };

  // Calculate stats dynamically
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTax = +(cartSubtotal * 0.08).toFixed(2);
  const cartTotal = cartSubtotal + cartTax;

  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    cartTax,
    cartTotal,
    handleAddToCart,
    handleRemoveItem,
    handleUpdateQuantity,
    clearCart,
    wishlistCount,
    handleAddToWishlist
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
