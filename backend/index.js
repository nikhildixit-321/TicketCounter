require('dotenv').config()  
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const app = express()


app.get('/', (req, res) => {
    res.send("Welcome to the Ticket Counter API!")
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})