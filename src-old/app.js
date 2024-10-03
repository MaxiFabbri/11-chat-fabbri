import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import config from './config.js';

const app = express();
const messagesLog = [];

const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});
const socketServer = new Server(httpServer);
socketServer.on('connection', socket => {
    console.log(`Nuevo Cliente conectado con ${socket.id}`);
    const connectionId = socket.id;

    socket.on('init-msg', data =>{
        const newMessage = {id: connectionId, message: data};
        messagesLog.push(newMessage);
        console.log(messagesLog)
    })

    socket.on('message', data =>{
        const newMessage = {id: connectionId, message: data};
        messagesLog.push(newMessage);
        console.log(messagesLog)
    })

    socket.emit('individual', 'Mensaje Individual para un solo socket');
    // socket.broadcast('Todos-sin-Actual','Mensaje para todos menos para el socket actual, Broadcast');
    socketServer.emit('Todos','Mensaje para todos los sockets conectados')

})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuro el motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

// Activo las rutas
app.use('/views', viewsRouter)
app.use('/api/users', usersRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));
