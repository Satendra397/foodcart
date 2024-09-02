const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyparser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyparser.json());

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sate@1234",
    database:"foodcartapp"
})
//login endpoint
app.post("/login" ,(req,res) =>{
    const q = " select * from user where email=? and password=?";
    connection.query(q,[req.body.email,req.body.password],(err,data) =>{
        if(err){
          return  res.json({err : err});
        }
        if(data.length > 0){
          return  res.json({message : "login successfully",data});
        }
        else{
          return  res.json({ message : "please enter valid username  and password "});
        }
    })
})
//register new user
app.post('/register',(req,res) =>{
  const {username,email,password} = req.body;

  //if user is already exist in database 
  const cheqeQuery = " SELECT * FROM user WHERE email = ? OR password = ?";
  connection.query(cheqeQuery,[email,password],(err,data) =>{
    if(err){
      return res.json({err : err});
    }
    if(data.length > 0){
      return res.json({message : "user with this email or password already exist"});
    }
    else{
      const query = " INSERT INTO user (username,email,password) VALUES (?, ? ,?) "
      connection.query(query,[username,email,password],(err,result) =>{
        if(err){
          return  res.json({err : err});
        }
        
          return res.json({message :"user registered successfully" , result});
        
       
      })
      
    }
  } )

 
})
// food list endpoint
app.get("/foodlist",(req,res) =>{
  const q = "SELECT * FROM fooditems";
  connection.query(q,(error,result) =>{
    if(error){
      return res.status(500).json({
        success:false,
        message:"failed to retireved food items from database",
        error:error
      });
    }
    return res.json({
      success : true,
      message : "food items retrived successfully",
      data : result
    });
  })
})

  // FoodDetails endpoint
  app.get('/fooddetails/:id', (req, res) => {
    const foodId = req.params.id;
    const q = "SELECT * FROM fooditems WHERE id = ? ";
  
    connection.query(q,[foodId] ,(err, data) => {
      if (err) return res.json({ err: err });
      return res.json(data);
    })
     
  
    });

    // Add item to cart endpoint
  app.post("/cart", (req, res) => {
    const { user_id, food_id } = req.body;
    const q = "INSERT INTO cart (user_id, food_id) VALUES (?, ?)";
    connection.query(q, [user_id, food_id], (err, data) => {
      if (err) return res.json({ err: err });
      return res.json({ message: "Item added to cart", data });
    });

    // Get cart items endpoint
    app.get("/cart/:user_id", (req, res) => {
      const user_id = req.params.user_id;
      const q = `
      SELECT fooditems.* FROM fooditems 
      JOIN cart ON fooditems.id = cart.food_id 
      WHERE cart.user_id = ?
  `;
      connection.query(q, [user_id], (err, data) => {
        if (err) return res.json({ err: err });
        return res.json(data);
      });

      // Remove item from cart endpoint
      app.delete("/cart/:user_id/:food_id", (req, res) => {
        const { user_id, food_id } = req.params;
        const q = "DELETE FROM cart WHERE user_id = ? AND food_id = ?";
        connection.query(q, [user_id, food_id], (err, data) => {
          if (err) return res.json({ err: err });
          return res.json({ message: "Item removed from cart" });
        });
      });
    });
  });




app.listen(3001,() =>{
    console.log("server is  running");
})