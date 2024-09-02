// Cart.js
import React from 'react';
import { useCart } from './CartContext'; // Import the useCart hook
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Destructure cart and removeFromCart from context

  return (
    <div className="cart-container">
      <h1>Cart ({cart.length})</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image_url} alt={item.name} />
            <h2>{item.name}</h2>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Cart.css';

// const Cart = ({ userId }) => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/cart/${userId}`);
//         setCartItems(response.data);
//       } catch (error) {
//         console.log('Error fetching cart items:', error);
//       }
//     };

//     fetchCartItems();
//   }, [userId]);

//   const removeFromCart = async (foodId) => {
//     try {
//       await axios.delete(`http://localhost:3001/cart/${userId}/${foodId}`);
//       setCartItems(cartItems.filter(item => item.id !== foodId));
//     } catch (error) {
//       console.log('Error removing item from cart:', error);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <h1>Cart ({cartItems.length})</h1>
//       <div className="cart-items">
        
// {cartItems.map(item => (
//   <div key={item.id} className="cart-item">
//     <img src={item.image_url} alt={item.name} />
//     <h2>{item.name}</h2>
//     <button onClick={() => removeFromCart(item.id)}>Remove</button>
//   </div>
// ))}
         
        
//       </div>
//     </div>
//   );
// };

// export default Cart;



