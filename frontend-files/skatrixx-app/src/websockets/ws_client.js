import { url } from '../services/friendsConnectionService';
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(url)