var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('group')) {
    window.location = 'index.html';
    throw new Error('Name and Group required');
}

var user = {
    name: params.get('name'),
    group: params.get('group')
};

// Listen
socket.on('connect', function() {
    console.log('Connected to the Server');

    socket.emit('openChat', user, function(resp) {
        console.log('Connected users: ', resp);
    });
});

// Listen
socket.on('disconnect', function() {
    console.log('Conecction losted');
});

// Send
// socket.emit('createMessage', {
//     user: 'Juan',
//     message: 'Hello'
// }, function(resp) {
//     console.log('Server response: ', resp);
// });

// Listen
socket.on('createMessage', function(message) {
    console.log('Server: ', message);
});

// Listen
socket.on('peopleList', function(people) {
    console.log('Server: ', people);
});

// Private Messages
socket.on('privateMessage', function(message) {
    console.log('Private message', message);
});