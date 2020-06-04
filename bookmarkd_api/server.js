const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.get('/', (req, res) => {
    res.send('Hello World')
})

//GLOBALS
const PORT = process.env.PORT || 3000
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/bookmarkd'

//DATABASE CONNECT
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db.on('open', () => {
    console.log('Mongo is Connected')
})

//LISTENER
app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})