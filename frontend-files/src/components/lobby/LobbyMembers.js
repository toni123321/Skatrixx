import React, { useState } from 'react'
import "../../stylesheets/lobby/LobbyMembers.css"
import InviteToLobby from './InviteToLobby'
import addFriend from "../../images/Add User Group Man Man.png"
import LobbyParticipant from './LobbyParticipant'

function LobbyMembers(props) {

  const [inviteToLobby, setInviteToLobby] = useState(false)

  const handleToggleInvitePopUp = () => {
    setInviteToLobby(!inviteToLobby)
  }

  if(props.members !== undefined) {
  return (
    <div className={`lobbyMembers ${!props.is_creator ? 'not-creator' : ''}`}>
        <div>
          <button id='invite-to-lobby-button' onClick={handleToggleInvitePopUp}> <img src={addFriend} id="addFriend" alt=""></img></button>
        </div>
        <div id='lobby-member-list'>
          {props.members.map(member => (
              <LobbyParticipant member={member} pending={false}/>
          ))}
          {props.pending.map(member => (
              <LobbyParticipant member={member} pending={true}/>
          ))}
        </div>
        {inviteToLobby ? <InviteToLobby close={handleToggleInvitePopUp} lobby={props.lobby}/> : ''}
    </div>
  )
}
else{return (<>Loading</>)}
}

export default LobbyMembers