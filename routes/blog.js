const express = require('express')
const {
    blog
} = require('../controllers/blog')
const router = express.Router()

router.get('/api', blog)

module.exports = router