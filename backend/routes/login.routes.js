const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');


// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now())
  next();
})

// define JWT secret key (must kept secret)
const secretKey = 'your-secret-key';


// define the home page route
router.post('/', (req, res) => {
  console.log('request body', req.body);

  // HARDCODED username & password to fake a login
  if(req.body.username === 'mario' && req.body.password ==='luigiluigiluigi'){

    const user = {
      id: 123,
      username: req.body.username,
      // Add more user data as needed
    };

    // Generate the JWT token
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

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
