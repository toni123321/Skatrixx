import './App.css';
import 'react-notifications/lib/notifications.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import NavBar from './components/NavBar';
import Profile from './components/Profile';
import SkatePage from './components/SkatePage';
import GamePage from './components/GamePage';
import Statistc from './components/Statistic';

import { useState, useEffect } from 'react';
import { getUser, loggedUser } from './services';
import {NotificationContainer, NotificationManager} from 'react-notifications';

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
          </Routes>
          <NavBar/>
          <NotificationContainer/>
      </div>
    </Router>
  );
}

export default App;
