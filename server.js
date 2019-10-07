const express = require('express')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config();

// app
const app = express()

// middlewares
app.use(morgan(`dev`))
app.use(bodyParse.json())
app.use(cookieParser())
app.use(cors())

// Routes
app.get('/api', (req, res) => {
    res.json({
        time: Date().toString()
    })
})

// Port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`))