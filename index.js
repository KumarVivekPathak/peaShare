import express from 'express';
import http from 'http'; 
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: true
});

io.on("connection", (socket) => {
    console.log("Socket connected.", socket.id);
    
    socket.on('code', (data) => {
        socket.broadcast.emit('code', data);
    });

    socket.on('disconnect', () => {
        console.log("Socket disconnected.", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
