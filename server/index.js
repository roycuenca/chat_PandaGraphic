var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));


//add test route
app.get('/hola-mundo', function (req, res){
    res.status(200).send('Hola Ruta Activa');
});

var messages = [{
    id: 1,
    text:'Bienvenido al chat de PandaGraphic. \n En que te podriamos ayudar?>',
    nickname:'Roy Cuenca'

}];

// Socket conection
io.on('connection', function(socket) {
    console.log('El Usiario  con IP: '+socket.handshake.address+" se a conectado...");

    socket.emit('messages', messages);

    socket.on('add-message', function (data){
       messages.push(data);
       io.sockets.emit('messages', messages); 
    });
});

// Activate the server
server.listen(6677, function () {
    console.log("Servidor esta funcionando correctamente en http://localhost:6677");    
});


