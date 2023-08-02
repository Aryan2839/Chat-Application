// const io=require('socket.io')(8000)
const io = require("socket.io")(8000, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
const users={}

io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('new-user-joined',name=>{
        console.log("new user is",name);
        users[socket.id]=name;        
        //emit a message to everyone except who i
        socket.broadcast.emit('user-joined',name)
    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message , named: users[socket.io]});
    });
})