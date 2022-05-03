const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
// mongoose.connect('mongodb://localhost/LOdown',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', function (){
    console.log(`connected to mongoDB ${db.host} : ${db.port}`)
});