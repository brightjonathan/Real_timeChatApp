const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());
const server = http.createServer(app);


//establishing connection between the server and the socket.io
const io = new Server(server, {
    //fixing connection problems with the frontend
    cors : {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

//event listerner for connection
io.on('connection', (socket)=>{
  console.log(`User Connected ${socket.id}`)

  //joining a room 
  socket.on('Join_room', (data)=>{
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  });

  //sending message
  socket.on('send_message', (data)=>{
    socket.to(data.room).emit('recieve_Message', data)
  })

  //for disconnection
  socket.on('disconnect', ()=>{
    console.log('user disconnected', socket.id)
  })

})


//my running server
server.listen(5000, () => {
    console.log("server running...");
  });