// Back-end port declaration
require('dotenv').config();
const port=process.env.PORT || 3000;

// Main Imports
const express = require('express')
const mongoose=require('mongoose');
const cors = require('cors');

// Router Imports
const usersRouter = require('./routes/users')
const skateDataRouter = require('./routes/skateDatas')
const trickDataRouter = require('./routes/tricks')
const connectioDataRouter = require('./routes/connections')
const lobbyDataRouter = require('./routes/skateLobbies')
const achievementsService = require('./routes/achievements')

// App and DB setup
const app=express();
const db=mongoose.connection;
app.use(express.json())

// CORS origin handling for App and WS
app.use(cors({
    origin: [
        'http://localhost:3001',
        'https://i451508.hera.fhict.nl',
        'https://i451508.hera.fhict.nl/*',
        'http://127.0.0.1:3001'
    ]
}));

// Confirms/Denies connection to DB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.error('Connected to MongoDB cloud'));

// Setting ENDPOINTS for the REST API
app.use('/users', usersRouter)
app.use('/skateDatas', skateDataRouter)
app.use('/tricks', trickDataRouter)
app.use('/connections', connectioDataRouter)
app.use('/lobbies', lobbyDataRouter)
app.use('/achievements', achievementsService)

const server = app.listen(port, () => {console.log(`Back end is running on port: ${port}`)});

//Websocket server declaration
const io = require("socket.io")(server, {
  cors: {
   origin: "*"
 }
});

io.on("connection", socket => {
  console.log(`${socket.id} has connected`);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on('log-in-user', (userid) => {
    socket.join(userid)
  })
  socket.on('join-lobby', (lobbyId) => {
    socket.join(lobbyId)
    console.log(`A user has joined ${lobbyId}`)
  })
  socket.on('leave-lobby', (lobbyId) => {
    socket.leave(lobbyId)
  })
  socket.on('log-out-user', (userId) => {
    socket.leave(userId)
  })

  app.set('socketio', io)

})
  
