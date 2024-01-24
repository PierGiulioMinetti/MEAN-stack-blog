//needed to access environment variables (hidden files) to bring JWT token into a Node.js file and to use it,
require('dotenv').config();

const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');


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
  if (req.body.username === 'mario' && req.body.password === 'luigi') {

    const user = {
      id: 123,
      username: req.body.username,
      // Add more user data as needed
    };

    // Generate the JWT token
    // The piece of data that you hash in your token can be something either a user ID or username or a much more complex object. In either case, it should be an identifier for a specific user.
    // The token expire time is a string, such as 1800 seconds (30 minutes), that details how long until the token will be invalid.
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1800s' });



    res.json({
      token,
      message: 'Succesfully logged in!',
      isLoggedIn: true
    });

  } else {
    res.status(401);
    res.json({
      message: 'Credentials not found',
      isLoggedIn: false
    });
  }
})

router.get('protected', (req, res) => {
  res.json({ privato: true })
})

// devo implementare la verifica per ritornare i dati se è presente il token

// example Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).send('Access denied');

//   jwt.verify(token, 'your-secret-key', (err, user) => {
//     if (err) return res.status(403).send('Invalid token');
//     req.user = user;
//     next();
//   });
// };

// Protected route example
// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ data: 'This is a protected route' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

module.exports = router;
