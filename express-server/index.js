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
const moduleStateRouter = require('./routes/moduleStates')
const achievementsService = require('./routes/achievements')
const consistencyRouter = require('./routes/consistencies');
const skateGallery = require('./routes/skateboardImages');
const gameRouter = require('./routes/skateGames')
const { Router } = require('express');

// App and DB setup
const app=express();
const db=mongoose.connection;
app.use(express.json())

// CORS origin handling for App and WebSockets(WS)
app.use(cors({
    origin: [
      process.env.LOCAL_FRONTEND_ORIGIN,
      process.env.LOCAL_FRONTEND_PATHS,
      process.env.PRODUCTION_FRONTEND_ORIGIN,
      process.env.PRODUCTION_FRONTEND_PATHS,
      process.env.PRODUCTION_FRONTEND_ORIGIN2,
      process.env.PRODUCTION_FRONTEND_PATHS2,
      process.env.LOCAL_LIVE_SERVER_FRONTEND
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
app.use('/moduleStates', moduleStateRouter)
app.use('/achievements', achievementsService)
app.use('/consistency', consistencyRouter)
app.use('/skateGallery', skateGallery)
app.use('/game', gameRouter)

const server = app.listen(port, () => {console.log(`Back end is running on port: ${port}`)});

app.get("*", (req, res) => {
  res.sendFile(path.join('/skate', "index.html"));
  res.sendFile(path.join('/trophy', "index.html"));
  res.sendFile(path.join('/game', "index.html"));
  res.sendFile(path.join('/join', "index.html"));
  res.sendFile(path.join('/create', "index.html"));
});

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
  socket.on('join-game', (gameLobby) => {
    socket.join(gameLobby)
  })

  app.set('socketio', io)

})
  
