const express = require('express');
const pool = require('../api/database');

const router = express.Router();

router.delete('/',(req,res)=>{
    let userId = req.query.user_id;
    console.log(req.body)
    console.log("Attempting to delete user:"+userId)
    pool.query('DELETE FROM users WHERE user_id = $1', [userId], (error, result)=>{
        if(error){
            console.log(error)
            res.status(403).json(error);
        } else {
            res.status(200).send('Successfuly deleted User')
        }
    });
});
module.exports = router;