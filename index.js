const path = require('path');
const express = require('express');
const app =express();
const Socketio = require('socket.io');

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname,'public')));

//start server
const server = app.listen(app.get('port'),()=>{
    console.log(`server start in port ${app.get('port')}`);
});

//socket
const io = Socketio(server);
//webscokets
io.on('connection',(socket)=>{
    console.log(`user[ ${socket.id} ] -> conected`);
    socket.on('disconnect',()=>{
        io.sockets.emit('disconnected',{ data:socket.id });
        console.log('user disconnected...');
    });
    socket.on('sendMSG',(data)=>{
        io.sockets.emit('renderMessage',data);
    })
});