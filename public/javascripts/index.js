        var socket = io();
        console.log('running.....');
        socket.on('connect', function(){
          console.log('user connected to the server...');
        });

        socket.on('disconnect',function(){
          console.log('user disconnected from server...');
        });

        socket.on('newMessage', function(message){
            console.log('newMessage',message);
        });