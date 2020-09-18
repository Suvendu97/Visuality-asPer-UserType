// requiring DB
const mongoose = require('mongoose');

// connect to my DB named as nodejs_Authentication
mongoose.connect('mongodb://localhost/profile_aspertype');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;