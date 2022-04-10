import { url } from '../services/connection';
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(url)