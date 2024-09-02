
// FoodDetails.js
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext'; // Import the useCart hook
import axios from 'axios';
import './FoodDetails.css';

const FoodDetails = ({ userId }) => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const { cart, addToCart } = useCart(); // Destructure cart and addToCart from context

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/fooddetails/${id}`);
        setFoodItem(response.data[0]);
      } catch (error) {
        console.log('Error fetching food item:', error);
      }
    };

    fetchFoodItem();
  }, [id]);

  if (!foodItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className='header'>
        <Link to="/cart">
          <h1 className='cart'> Cart ({cart.length})</h1>
        </Link>
        <h1>Food Details</h1>
      </header>
      <div className="food-details-container">
        <div className="food-details">
          <img className="food-details-image" src={foodItem.image_url} alt={foodItem.name} />
          <h2 className="food-details-title">{foodItem.name}</h2>
          <p className="food-details-description">{foodItem.description}</p>
          <button className="food-details-button"
            onClick={() => addToCart(foodItem)}
            disabled={cart.some(cartItem => cartItem.id === foodItem.id)}>
            {cart.some(cartItem => cartItem.id === foodItem.id) ? 'In Cart' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
