const express = require('express');
const path = require('path');
const app = express();
const http = require('http'); // Importa el módulo HTTP

app.set('port', process.env.PORT || 3000);

// Establece la carpeta que contiene los archivos estáticos (CSS, JavaScript, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app); // Crea un servidor HTTP

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('nueva conexion', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});

server.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});
