const express = require('express');
const pool = require('../api/database');
//const bcrypt = require('bcryptjs'); Encryption
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const { json } = require('express');
dotenv.config();

const router = express.Router();

router.post('/', (req,res) => {
  let userObj = req.body;
  console.log(JSON.stringify(userObj));
  let username = userObj.username;
  let password = userObj.password;
  console.log(username);
  pool.query('SELECT username,password FROM users WHERE username=$1',[username],(error,results)=>{//Query server for user
      if(error){
          console.log(`Login Query error: ${error}`);
          res.status(403).json(error);
      }

      if (results.rowCount == 0){ //If username not found, return error
          res.status(400).json();
      } else {
          let data = results.rows[0];
          console.log(data);
          if(data.password == password){//Check password to passsword stored in db.
              console.log("Password is correct")
              const token = jwt.sign({username:username},process.env.TOKEN_SECRET,{expiresIn: '24h'});//Create Token
              res.status(200).cookie("access_token", token,{
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 24 * 60 * 60 * 1000 //make cookie last 24 hours 
            }).json();
          } else {//Send status for password incorrect
              console.log("Password is incorrect")
              res.status(403).json()//send password incorrect
          }
      }
  })
});

module.exports = router;