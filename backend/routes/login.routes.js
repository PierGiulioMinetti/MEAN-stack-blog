//needed to access environment variables
require('dotenv').config();
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now())
  next();
})

// FUTURE IMPLEMENTATION
// function authenticateToken(req, res, next) {
//   // we are getting the 'authorization' header from the request
//   const authHeader = req.headers['authorization'];
//   // we are dividing the authorization header from the token
//   // this is the format we are getting the header --> authorization: BEARER asdòlfk4potjgpo
//   // ?? if different from null or undefined--> authHeader.split(' ')[1]
//   const token = authHeader ?? authHeader.split(' ')[1];

//   if(token === null){
//     return res.sendStatus(401)
//   }
// }

// define the home page route
router.post('/', (req, res) => {
  console.log('request body', req.body);

  // HARDCODED username & password to fake a login
  if(req.body.username === 'mario' && req.body.password ==='luigi'){

    const user = {
      id: 123,
      username: req.body.username,
      // Add more user data as needed
    };

    // Generate the JWT token
    const token = jwt.sign(user, process.env.SECRET_KEY);

    console.log('secret key:---->', process.env.SECRET_KEY);

    res.json({
      token,
      message:'Succesfully logged in!',
      isLoggedIn: true
     });

  } else {
    res.status(401);
    res.json({
      message:'Credentials not found',
      isLoggedIn: false
    });
  }
})

module.exports = router;
