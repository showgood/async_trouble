var express = require('express');
var app = express();

var simulator = { host : "127.0.0.1", port:8124, name:"simulator"};
var telnetCmder = require('./telnetCmder');

function sendTelnetCmd(target, cmd, callback) {
    var cmder = telnetCmder.getCmder(target);

    cmder.send(cmd, callback);
};

app.get('/cmd', function(req, res) {
    var cmd = req.param('cmd');
    console.log('got cmd:', cmd);

    sendTelnetCmd(simulator, cmd, function(error, data) {
        if (error) {
            res.json(error);
        }
        else {
            res.json(data.toString());
        }
    });
});

app.listen(3000);
