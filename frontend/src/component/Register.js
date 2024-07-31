import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [isSubmiting,setIsSubmiting] = useState(false);
  const navigate = useNavigate();


  const handleRegister =async (e) =>{
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmiting(true);
    try {
        const response = await axios.post("http://localhost:3001/register",{username,email,password});
        if(response.data.message==="user registered successfully"){
            setSuccess(response.data.message);
            setEmail("");
            setPassword("");
            setUsername("");
          setTimeout(() => navigate("/"),2000);// navigate login page after 2 second

        }
        else{
            setError(response.data.message);
           
        }
        
    } catch (error) {
        setError("An error occured . Please try again.")
        
    }finally{
      setIsSubmiting(false);
    }
  }
  return (
    <div className="register-container">
      <h2> Register New User</h2>
      
    <form className="register-form" onSubmit={handleRegister}>
      <label htmlFor="username">UserName </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      required></input><br/>
      <label htmlFor="email">Email </label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      required></input><br/>
      <label htmlFor="password">Password </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      required></input><br/>
      <button type="submit" disabled={isSubmiting}>Submit</button>
      {email && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
    </div>
  );
};
export default Register;
