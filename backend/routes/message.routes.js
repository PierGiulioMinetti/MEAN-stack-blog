const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('', (req, res) => {
  res.json({ message:
          'Hello GEEKS FOR GEEKS Folks from the Express server!' });
});

module.exports = router
