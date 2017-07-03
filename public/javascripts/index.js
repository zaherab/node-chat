        var socket = io();
        console.log('running.....');
        socket.on('connect', function(){
          console.log('connected to the server...');
          socket.emit('createMessage',{
              from: 'Zaher',
              text:'works for me'
          }); 
 
        });

        socket.on('disconnect',function(){
          console.log('disconnected from server...');
        });

        socket.on('newMessage', function(message){
            console.log('newMessage',message);

        })