const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now())
  next();
})
// define the home page route
router.post('', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "POST");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if(req.body){
    console.log('log node', req.body);
    res.json({logout: true});
  }

})

module.exports = router
