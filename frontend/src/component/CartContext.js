// CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the CartContext
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ userId, children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart items when the provider mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cart/${userId}`);
        setCart(response.data);
      } catch (error) {
        console.log('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const addToCart = async (foodItem) => {
    if (cart.length < 3 && !cart.some(cartItem => cartItem.id === foodItem.id)) {
      try {
        await axios.post('http://localhost:3001/cart', {
          user_id: userId,
          food_id: foodItem.id,
        });
        setCart([...cart, foodItem]);
      } catch (error) {
        console.log('Error adding item to cart:', error);
      }
    } else if (cart.some(cartItem => cartItem.id === foodItem.id)) {
      alert('Item is already in the cart.');
    } else {
      alert('You can only add a maximum of 3 items to the cart.');
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      await axios.delete(`http://localhost:3001/cart/${userId}/${foodId}`);
      setCart(cart.filter(item => item.id !== foodId));
    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
