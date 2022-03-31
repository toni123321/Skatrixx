import './App.css';
import 'react-notifications/lib/notifications.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import NavBar from './components/NavBar';
import Profile from './components/Profile';
import SkatePage from './components/SkatePage';
import GamePage from './components/GamePage';
import Statistc from './components/Statistic';

import { useState, useEffect } from 'react';
import { loggedUser } from './services/api_client';
import { getUser } from './services/user';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import JoinSkateLobby from './components/JoinSkateLobby';
import CreateSkateLobby from './components/CreateSkateLobby';

export const friendRequestSent = () => {
  NotificationManager.success('Friend Request Has Been Sent', 'Success')
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

function App() {

  const [user, setUser] = useState('')

  const loadUser = async () => {
    setUser(await getUser(loggedUser))
  }

  useEffect(() => {
    loadUser();
  }, [])
  
  return (
    <Router>
        <div>
          <Routes>
            <Route path={'/'} exact element={<Profile name={user.username} img={user.image} level={user.level} xp={user.xp}/>}/>
            <Route path={'/skate'} element={<SkatePage/>}/>
            <Route path={'/trophy'} element={<Statistc/>}/>
            <Route path={'/game'} element={<GamePage />}/>
            <Route path={'/join'} element={<JoinSkateLobby/>}/>
            <Route path={'/create'} element={<CreateSkateLobby/>}/>
          </Routes>
          <NavBar/>
          <NotificationContainer/>
      </div>
    </Router>
  );
}

export default App;

