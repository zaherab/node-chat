var socket = io();
$(document).ready(function () {
    socket.on('connect', function () {
        console.log('user connected to the server...');
    });

    socket.on('disconnect', function () {
        console.log('user disconnected from server...');
    });

    socket.on('newMessage', function (message) {
        var li = $('<li></li>')
        li.text(`${message.from}: ${message.text}`);

        $('#messages').append(li);
    });
 socket.on('newLocationMessage', function (message) {
        var li = $('<li></li>');
        var a = $('<a target="_blank"> My current location</a>');

        li.text(`${message.from}:`);
        a.attr('href',message.url);
        li.append(a);
        $('#messages').append(li);
    });
    // socket.emit('createMessage', {
    //     from: 'Zaher',
    //     text: "Hi everybody!!!"
    // }, function (data) {
    // });

    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function (data) {
        });
    });

    var locationBtn = $('#send-location');
    locationBtn.on('click',function(){
        if(!navigator.geolocation){
            return alert('Geolocation not support by your browser')
        }
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        },function(){
            alert('Unable to fetch location')
        })
    });
});