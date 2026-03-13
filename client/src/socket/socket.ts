import { io  } from "socket.io-client";

const SOCKET_URL = 'localhost:3000';

export const socket = io(SOCKET_URL, {
    auth: {
        serverOffset: 0
    }
})


