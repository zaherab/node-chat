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

socket.emit('createMessage', {
    from: 'Zaher',
    text: "Hi everybody!!!"
}, function (data) {
});

    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function (data) {
        });
    });
});