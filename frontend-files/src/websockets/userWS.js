import { socket } from './ws_client'

export const logInUser = () => {
  socket.emit(`log-in-user`, localStorage.getItem('userId')) 
}

export const sendFriendRequest = (userId) => {
  socket.emit('send-friend-request', userId)
}

