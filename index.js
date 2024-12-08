import express from 'express';
import http from 'http'; 
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
const server = http.createServer(app);

// const io = new Server(server, {
//     cors: true
// });

const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173", // Your frontend URL
      methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('code-change', ({ roomId, code }) => {
    console.log("code is changes", code)
    socket.to(roomId).emit('code-change', code);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});