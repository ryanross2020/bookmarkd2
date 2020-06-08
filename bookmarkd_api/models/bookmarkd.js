const {Schema, model} = require('mongoose')

const bookmarkSchema = Schema({
    title: String,
    url: String
})

const Bookmark = model('bookmark', bookmarkSchema)

module.exports = Bookmark