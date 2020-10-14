const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routeNav = require('./src/')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/v1', routeNav)

app.listen(process.env.PORT || 8000, () => { 
    console.log('Server running')
})