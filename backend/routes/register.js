const express = require('express');
//const bcrypt = require("bcryptjs")
const pool = require('../api/database');

const router = express.Router();

function validateRegister(username,password,email){
  return !!(username && password && email);
}

router.post('/', (req,res) => {
  let {username, password, email} = req.body;
  console.log([username,password,email]);
  if (validateRegister(username,password,email)){
    pool.query('SELECT * FROM users WHERE username=$1', [username], (error,results) => { // Query to check for username already taken
      if(error) {
        console.log(`User Table Check Query error: ${error}`);
        res.status(403).json(error);
        console.log("-----------------------------------------------------------------------")
      }
      console.log(results.rows)
      if(results.rowCount > 0){ //Throws error if username found in DB
        res.status(409).send('Username already taken');
      } else { // Else insert new user
        //hashPassword = bcrypt.hashSync(password,10);
        //console.log(hashPassword);
        pool.query('INSERT INTO users VALUES(DEFAULT,$1,$2,$3)', [username,password,email], (error2,results2) => { // Query to insert new user
          if(error2){
            console.log(`Registration Query error: ${error2}`);
              res.status(403).send("Query Error");
          }
        
          res.status(201).send('New user added successfully');
        });
      }
  });
  } else {//What to do if invalid register form
    res.status(403).send("Improper Form");
  }

});

module.exports = router;