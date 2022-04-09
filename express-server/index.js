const express= require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const mongoose=require('mongoose');
require('dotenv').config();

///
// const http = require("http");
// const socketIo = require("socket.io");


// const index = require("./routes/users");

// app.use(index);

// const server = http.createServer(app);



// const io = socketIo(server, { cors: { origin: '*' } }); // < Interesting!

// //tva e koeto se prashta (API-TO)
// const getApiAndEmit = socket => {
//     const response = usersRouter;
//     // Emitting a new message. Will be consumed by the client
//     socket.emit("FromAPI", response);
//   };
  


// // let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
// //   if (interval) {
// //     clearInterval(interval);
// //   }
// //   interval = setInterval(() => getApiAndEmit(socket), 1000);
// getApiAndEmit(socket)

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     // clearInterval(interval);
//   });

// });


/// lainaa

// Add CORS to API
const cors = require('cors');
app.use(cors({
    origin: [
        'http://localhost:3001',
        'https://i451508.hera.fhict.nl',
        'https://i451508.hera.fhict.nl/*',
        'http://127.0.0.1:3001'
    ]
}));


app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.error('Connected to db'));


app.use(express.json())


const usersRouter = require('./routes/users')
const skateDataRouter = require('./routes/skateDatas')
const trickDataRouter = require('./routes/tricks')
const connectioDataRouter = require('./routes/connections')
const lobbyDataRouter = require('./routes/skateLobbies')


app.use('/users', usersRouter)
app.use('/skateDatas', skateDataRouter)
app.use('/tricks', trickDataRouter)
app.use('/connections', connectioDataRouter)
app.use('/lobbies', lobbyDataRouter)


// PORT
const port=process.env.PORT || 3000;
// const porT = process.env.PORT || 4001;

app.listen(port, () => console.log(`Listen on port ${port}...`));


// server.listen(porT, () => console.log(`Listening on port ${porT}`));
