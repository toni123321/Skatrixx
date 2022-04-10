import { socket } from "./ws_client";

export const acceptInvite = (lobbyId) => {
    socket.emit('join-lobby', lobbyId)
    window.location.replace('/create')
}

export const denyInvite = (lobbyId) => {
    socket.emit('leave-lobby', lobbyId)
    window.location.replace('/')
}