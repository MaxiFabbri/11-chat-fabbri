const socket = io();
socket.emit('init-msg', 'Hola soy el cliente Maxi desde Chat');

socket.on('individual',(data)=>{
    console.log(data);
});

// socket.on('message',(data)=>{
//     console.log(data);
// });

function sendMessage() {
    // Obtener el elemento input por su id
    const inputElement = document.getElementById('message');
    
    // Capturar el valor del input
    const inputValue = inputElement.value;
    
    // Mostrar el valor en la consola
    // console.log(inputValue);
    socket.emit('message', inputValue);
}



// socket.on('Todos-sin-Actual',(data)=>{
//     console.log(data);
// });

// socket.on('Todos',(data)=>{
//     console.log(data);
// });