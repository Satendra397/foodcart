import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import './FoodList.css';

const FoodList = () => {
  const [fooditems, setFooditems] = useState([]);
 const [status , setStatus]= useState('');
 const [message , setMessage] = useState('');

  useEffect( () =>{
   const fetchFoodItems = async() =>{
    try {
        const response = await axios.get("http://localhost:3001/foodlist");
        const data = response.data;
        //setFooditems(data);
        if(data.success){
          setFooditems(data.data);
          setStatus("success");
          setMessage('');
        }else{
          setStatus('error');
          setMessage(data.message);
        }
        
    } catch (error) {
        console.log("Error fetching food items ",error);
        setStatus("error");
        setMessage("Error fetching food items");
        
    }
   }
   fetchFoodItems();
  },[])

  return (
    <div className="foodlist-container">
      <div>
        <h2>FoodList</h2>
      </div>
      {status && (<div className={`message ${status}`}>
        {message}

      </div>)}
      <section className="foodlist-item">
        {fooditems.map((food) => (
          <div key={food.id} className="food-card">
            <img src={food.image_url} alt={food.name}></img>
            <h2>{food.name}</h2>
            <Link to={`/fooddetails/${food.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};
export default FoodList;
