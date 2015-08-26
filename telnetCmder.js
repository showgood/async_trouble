var net = require('net');
var cmder = null;

function getCmder(target) {
    if (!cmder) {
        cmder = new telnetCmder(net.connect(target, function() {
            console.log('connected to server!');
        }));
    }

    return cmder;
}

telnetCmder = function(socket) {
    this.socket = socket;
};

telnetCmder.prototype = {};

telnetCmder.prototype.send = function(cmd, callback) {
    if (!this.socket) {
        var e = new Error('not connected yet');
        return callback(e, null);
    }

    this.socket.write(cmd);

    // using once() instead of on() fixes the header has been 
    // sent error!!
    this.socket.once('data', function(data) {
        callback(null, data);
    });
};

module.exports = {
    getCmder:getCmder
};
