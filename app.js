require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/connect')

const PORT = process.env.PORT || 5000


const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`Server is listening on ${PORT}...`))
    } catch (error) {
        console.log(error)
    }

}

start()