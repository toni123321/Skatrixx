const express= require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const mongoose=require('mongoose');
require('dotenv').config()

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.error('Connected to db'));


app.use(express.json())


const usersRouter=require('./routes/users')
const skateDataRouter=require('./routes/skateDatas')
const trickDataRouter=require('./routes/tricks')


app.use('/users', usersRouter)
app.use('/skateDatas', skateDataRouter)
app.use('/tricks', trickDataRouter)


// PORT
const port=process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen on port ${port}...`));


