const socket=io('http://localhost:8000');

const form=document.getElementById('send-container')
const messageInput=document.getElementById('messageInp')
const msgcontainer=document.querySelector('.container')
console.log(socket);

const append=(message,position)=>{
    const messageEle=document.createElement('div'); 
    messageEle.innerText=message;
    messageEle.classList.add('message');
    messageEle.classList.add(position);
    msgcontainer.append(messageEle); 

}

form.addEventListener('submit',(err)=>{
  err.preventDefault();

  const message=messageInput.value;
  append(`You:${message}`,'right');
  socket.emit('send',message);
  messageInput.value='';

});
const Name=prompt("Enter your name");
socket.emit('new-user-joined',Name);

// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     socket.on('chatMessage', (message) => {
//       console.log('Received message:', message);
//       io.emit('chatMessage', message); // Broadcast the message to all connected clients
//     });
  
//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });

socket.on('user-joined',name=>{
 append(`${name} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.named}:${data.message}`,'left');
   })