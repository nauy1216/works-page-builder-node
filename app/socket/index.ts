import { Server } from 'http'
import * as Socket from "socket.io"
export default function createSocket(server: Server) {
    const io =  new Socket.Server(server, {
        // path: '/test',
        // serveClient: false,
        // // below are engine.IO options
        // pingInterval: 10000,
        // pingTimeout: 5000,
        // cookie: false
    });
    io.on('connection', (socket) => {
        console.log('socket连接成功', socket);
    });
}