import { socket } from "./ws_client";

export const acceptInvite = (lobbyId) => {
    socket.emit('join-lobby', lobbyId)
    window.location.replace('/create')
}

export const denyInvite = (lobbyId) => {
    socket.emit('leave-lobby', lobbyId)
    window.location.replace('/')
}

export const kicked = () => {
    socket.on('kicked', () => {
        window.location.replace('/join')
      })
}

export const startGameRedirect = (lobbyId) => {
    socket.on('redirect', () => {
        window.location.replace(`/skate-game/${lobbyId}`)
    })
}

export const startLobbyWS = (lobbyId) => {
    socket.emit('start-game', lobbyId)
}