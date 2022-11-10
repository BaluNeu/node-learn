const express = require('express');

const app = express();

const mongoose = require('mongoose')

const uri = "mongodb+srv://srinivasulu:srinivasulu@todoapp.m9aqbhs.mongodb.net/?retryWrites=true&w=majority"

//mongoose.connect('mongodb://localhost:27017/subscribers',{useNewUrlParser:true});
async function connect(){
    try{
        await mongoose.connect(uri)
        console.log('mongodb connected successfully')
    }catch(e){
        console.error(e)  
}
}

connect();

const db = mongoose.connection;

app.use(express.json());

const subscriberRouter = require('./routes/subscribers.js')
const todoAppRouter = require('./routes/todoApp.js')

app.use('/subscribers', subscriberRouter );
app.use('/todoApp', todoAppRouter );

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'))

app.listen(3000, ()=> {console.log('server listening to 3000')});

