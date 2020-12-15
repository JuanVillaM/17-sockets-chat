const createMessage = (name, message) => {
    return {
        name,
        message,
        fecha: new Date().getTime()
    }
};

module.exports = {
    createMessage
};