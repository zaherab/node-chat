        var socket = io();
        console.log('running.....');
        socket.on('connect', function(){
          console.log('connected to the server...');
        });

        socket.on('disconnect',function(){
          console.log('disconnected from server...');
        });

        socket.on('newMessage', function(message){
            console.log('newMessage',message);

        })