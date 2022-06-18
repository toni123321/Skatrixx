import React, { useState } from 'react'
import "../../stylesheets/lobby/LobbyMembers.css"
import InviteToLobby from './InviteToLobby'
import addFriend from "../../images/Add User Group Man Man.png"
import LobbyParticipant from './LobbyParticipant'
import { loggedUser } from '../../services/api_client'

function LobbyMembers(props) {

  const [inviteToLobby, setInviteToLobby] = useState(false)

  const handleToggleInvitePopUp = () => {
    setInviteToLobby(!inviteToLobby)
  }

  if(props.members !== undefined) {
  return (
    <div className='lobbyMembers'>
        <div id={"lobbyMembers-info"}>
          <p>Players: <span id={"lobby-player-count"}>{props.members.length}</span></p>
          <p className='add-friend-lobby' id='add-friend' onClick={handleToggleInvitePopUp}>Add</p>
        </div>
        <div id='lobby-member-list'>
          {props.members.map((member, index) => (
              <LobbyParticipant member={member} pending={false} memberNr={index} kickable={props.members[0] === loggedUser ? true : false} lobbyId={props.lobby._id} key={index}/>
          ))}
          {props.pending.map((member, index) => (
              <LobbyParticipant member={member} pending={true} key={index}/>
          ))}
        </div>
        {inviteToLobby ? <InviteToLobby close={handleToggleInvitePopUp} lobby={props.lobby}/> : ''}
    </div>
  )
}
else{return (<>Loading</>)}
}

export default LobbyMembers