require('dotenv').config()

const SECRET = process.env.SECRET
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    SECRET
}