var socket = io();
$(document).ready(function () {
    socket.on('connect', function () {
        console.log('user connected to the server...');
    });

    socket.on('disconnect', function () {
        console.log('user disconnected from server...');
    });

    socket.on('newMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = $('#message-template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

        $('#messages').append(html);
        // var formattedTime = moment(message.createdAt).format('h:mm a');
        // var li = $('<li></li>')
        // li.text(`${message.from} ${formattedTime} : ${message.text}`);

        // $('#messages').append(li);
    });
    socket.on('newLocationMessage', function (message) {
        var formattedLocationTime = moment(message.createdAt).format('h:mm a');
        var template = $('#location-message-template').html();
        var html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            createdAt: formattedLocationTime
        });

        $('#messages').append(html);
        // var formattedLocationTime = moment(message.createdAt).format('h:mm a');
        // var li = $('<li></li>');
        // var a = $(' <a target="_blank">My current location</a>');

        // li.text(`${message.from} ${formattedLocationTime}: `);
        // a.attr('href', message.url);
        // li.append(a);
        // $('#messages').append(li);
    });

    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function () {
            $('[name=message]').val('')
        });
    });

    var locationBtn = $('#send-location');
    locationBtn.on('click', function () {
        if (!navigator.geolocation) {
            return alert('Geolocation not support by your browser')
        }
        locationBtn.attr('disabled', 'disabled').text('Sending Location... ');
        navigator.geolocation.getCurrentPosition(function (position) {
            locationBtn.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

        }, function () {
            alert('Unable to fetch location');
            locationBtn.removeAttr('disabled').text('Send Location');
        })
    });
});