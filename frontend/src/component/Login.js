import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import  './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error ,setError] = useState("");
  const navigate = useNavigate();


  const handleLogin =async (e) =>{
    e.preventDefault();
    //setError("");
    try {
        const response = await axios.post("http://localhost:3001/login",{email,password});
        if(response.data.message==="login successfully"){
            navigate("/foodlist");
        }else{
          setError(response.data.message);
        }
        
    } catch (error) {
      setError("An error occured.please try again..");
       
        
    }

  }
  return (
    <div className="login-container">
      <h2> SIGN IN</h2 >
      <form className="form" onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      required></input>
      < br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      required></input><br/>
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
      <p className="register"> Don't have an account? <Link to='/register'>Register here</Link></p>
      
    </form>
    
    </div>

  );
};
export default Login;
