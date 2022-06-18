import React, { useEffect, useState } from 'react'
import { acceptAndJoinLobby } from '../../services/lobbyService';
import { getUser } from "../../services/userService";
import { acceptInvite } from '../../websockets/lobbyWS';

function CityMapLobby(props) {

    const [leader, setLeader] = useState(undefined)

    const loadLeader = async () => {
        setLeader(await getUser(props.lobby.members[0]))
    } 

    useEffect(() => {
      loadLeader()
    }, [])

    const joinLobby = async () => {
      await acceptAndJoinLobby(props.lobby._id, localStorage.getItem('userId'))
      acceptInvite()
  }
    

   if(leader !== undefined) { 
  return (
    <div className="joinLobby container-border" onClick={joinLobby}>
    <div className="default-container"></div>
    <img className="lobbyProfilePicMap" src={leader.image} alt=''/>
    <div className="ContainerInfo">
      <p className="lobbyTitleMap">
          {leader.username.split(' ')[0]}'s Lobby
        </p>
        <div className="lobbyAreaInfo">
        <p className="lobbyAreaTitle"> <i className="fas fa-map-marker-alt"></i>Eindhoven</p> 
        </div>
        <div className="lobbyStatusInfo">
        <p className="lobbyStatusTitle"><i className="fa-solid fa-clock"></i>Status: waiting</p> 
        </div>
        </div>
        <div className="joinLobbyButtonContainer">
          <p className="joinLobbyButton">Join<i className="fa-solid fa-arrow-right-long fa-2xl"></i></p>
        </div>
    </div>
  )} else {
    <div>Loading...</div>
  }
}

export default CityMapLobby