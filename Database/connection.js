const mongoose = require('mongoose');
const URL = "mongodb://webhook:webhook@139.59.5.96:27017/webhook"

mongoose.Promise = global.Promise;

module.exports = () => {

    return mongoose.connect(URL,{
        useNewUrlParser:true
    }).then(() => {
        console.log("Database_connected_successfully");
    }).catch(err => {
        console.log("Error in code ",err);
        process.exit();
    });

}