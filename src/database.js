require('dotenv/config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

var host = process.env.DB_HOST
var port = process.env.DB_PORT
var dbName = process.env.DB_NAME

var connection = `mongodb://${host}:${port}/${dbName}`

module.exports = mongoose.connect(connection, {useNewUrlParser: true}, function(error){
    if(error) {
        console.log("Error conection with DB:" + error);
    } else {
        console.log('Connected to database');
    }
});