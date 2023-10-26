const socket = io()
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function(){
    socket.emit('chat:message', 
    {
       username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', function(){
    console.log(username.value);
socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data)
{
    actions.innerHTML = '';
output.innerHTML+= `<p>
<strons>${data.username}</strong>:${data.message}
</p>`  
});

socket.on('chat:typing', function (data)
{
actions.innerHTML = `<p><em>${data} esta escribiendo</em></p>`
});