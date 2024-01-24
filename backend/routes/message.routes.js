const express = require('express')
require('dotenv').config();

const router = express.Router();
const jwt = require('jsonwebtoken');
const {authCheck} = require('../middleware/authToken');
const expressJwt = require('express-jwt');
const cors = require('cors');

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now())
  // res.json('JWT Authorized!')
  next();
})

// function authenticateToken(req, res, next) {
//   const authHeader = req.header['Authorization'];
//   const token = authHeader && authHeader.split[' '][1];
//   if(token == null){
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
//     if(err){
//       return res.sendStatus(403);
//     }
//     console.log('log request', req);
//     // req.user = user;
//     next();
//   })
// }

// define the home page route
router.get('', authCheck, (req, res) => {

  // const token = authHeader && authHeader.split[' '][1];


  // console.log('secret key MESSAGE', process.env.SECRET_KEY);
  res.send({auth: true});
});

module.exports = router
