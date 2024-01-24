const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now())
  next();
})
// define the home page route --> url will be --> 'localhost//birds'
router.get('/', (req, res) => {
  res.json({birdsHomepage:'Birds homepage'})
})
// define the about route --> url will be --> 'localhost//birds/about'
router.get('/about', (req, res) => {
  res.json({birds:'About birds'})
})

module.exports = router
