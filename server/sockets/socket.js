const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');
const users = new Users();

io.on('connection', (client) => {

    client.on('openChat', (data, callback) => {

        if (!data.name || !data.group) {
            return callback({
                error: true,
                message: 'Name/Group required'
            });
        }

        client.join(data.group);
        users.addPerson(client.id, data.name, data.group);
        client.to(data.group).emit('peopleList', users.getPersonPerGroup(data.group));
        callback(users.getPersonPerGroup(data.group));
    });

    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.group).emit('createMessage', message);
    });

    client.on('disconnect', () => {
        let personDeleted = users.deletePerson(client.id);
        client.broadcast.to(personDeleted.group).emit('createMessage', createMessage('Admin', `${personDeleted.name} left the chat`));
        client.broadcast.to(personDeleted.group).emit('peopleList', users.getPersonPerGroup(personDeleted.group));
    });

    // Private messages
    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.for).emit('privateMessage', createMessage(person.name, data.message));
    });

});