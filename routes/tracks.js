const express = require('express')
const router = express.Router()

// Getting all
router.get('/', async (req, res) => {
    res.send('HELLO WORLD')
  })

// Creating one
router.post('/', async (req, res) => {

  })

module.exports = router