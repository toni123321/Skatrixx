import './App.css';
import 'react-notifications/lib/notifications.css';
import backgroundImage from './images/background_image.png'


import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { url } from './services/friendsConnectionService';
import { socket } from './websockets/ws_client';
import { logInUser } from './websockets/userWS';

import NavBar from './components/NavBar';
import Profile from './components/profile/Profile';
import SkatePage from './components/skateStats/SkatePage';
import GamePage from './components/lobby/GamePage';
import JoinSkateLobby from './components/lobby/JoinSkateLobby';
import CreateSkateLobby from './components/lobby/CreateSkateLobby';
import LogInScreen from './components/auth/LogInScreen'
import LobbyInvitePopUp from './components/lobby/LobbyInvitePopUp';
import Achievements from './components/achievements/Achievements';



export const friendRequestSent = () => {
  NotificationManager.success('Friend Request Has Been Sent', 'Success')
}

export const friendInvited = (username) => {
  NotificationManager.success(`${username} has been invited to the lobby`, 'Success')
}

export const friendRequsetCancelled = () => {
  NotificationManager.success('Friend Request Has Been Cancelled', 'Success')
}

export const friendRequsetAccepted = () => {
  NotificationManager.success('Friend Request Has Been Accepted', 'Success')
}

export const errorPopUp = () => {
  NotificationManager.error('There was a problem, please try again', 'Error')
}

export const lobbyNotFound = () => {
  NotificationManager.error('This lobby does not exist', 'Error')
}

function App() {

  const [user, setUser] = useState('')
  const [lobbyInvite, setLobbyInvite] = useState(null);

  useEffect(() =>{
    if(localStorage.getItem("userId") !== null){
      axios.get(`${url}users/${localStorage.getItem("userId")}`)
      .then((response) => {
        if(response.status===200){
           setUser(response.data)
           logInUser()
        }
      })
    }
  })

  socket.on(localStorage.getItem('userId'), lobby => {
    setLobbyInvite(lobby)
  })

  if(localStorage.getItem('userId') !== null) {
  return (
    <Router>
        <div>
        <img id='background-image' src={backgroundImage} alt=''/>
          <Routes>
            <Route path={'/'} exact element={<Profile name={user.username} img={user.image} level={user.level} xp={user.xp}/>}/>
            <Route path={'/skate'} element={<SkatePage/>}/>
            <Route path={'/trophy'} element={<Achievements/>}/>
            <Route path={'/game'} element={<GamePage />}/>
            <Route path={'/join'} element={<JoinSkateLobby/>}/>
            <Route path={'/create'} element={<CreateSkateLobby/>}/>
          </Routes>
          <NavBar/>
          <NotificationContainer/>
      </div>
      {lobbyInvite !== null ? <LobbyInvitePopUp lobby={lobbyInvite}/> : ''}
    
    </Router>
    
  )
}
else {return <LogInScreen/>}
}
export default App;

