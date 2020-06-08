//DEPENDENCIES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

//GLOBALS
const PORT = process.env.PORT || 3000
const bookmarkdController = require('./controllers/bookmarkd.js')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/bookmarkd'
const whitelist = ['http://localhost:1985']
const corsOptions = {
    origin: function (origin, callback){
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}


//DATABASE CONNECT
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db.on('open', () => {
    console.log('Mongo is Connected')
})

//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use('/bookmarkd', bookmarkdController)

//LISTENER
app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})