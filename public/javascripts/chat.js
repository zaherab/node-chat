var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child')
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function (error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log(params);
        }
    });
});

socket.on('disconnect', function () {
    console.log('user disconnected from server...');
});

socket.on('updateUserList', function (users) {
    console.log('users List', users);
    var ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user))
    });
    $('#users').html(ol);
})

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
});

$('#message-form').on('submit',function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
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