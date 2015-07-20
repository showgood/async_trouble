var express = require('express');
var app = express();

var simulator = { host : "127.0.0.1", port:8124, name:"simulator"};

var net = require('net');
var telnetClient = null;

function sendTelnetCmd(target, cmd, callback)
{
    if (!telnetClient) {
        telnetClient = net.connect(target, function() {
           console.log('[INFO] connected to ' + target.name);
        });
    }

    telnetClient.write(cmd.trim());

    telnetClient.on('data', function(data) {
        console.log('get data: ' + data.toString());
        callback(null, data);
        //uncomment these it would work
        //telnetClient.destroy();
        //telnetClient = null;
    });

    telnetClient.on('end', function() { 
       console.log('[INFO] disconnected from server');
    });

    telnetClient.on('error', function(e) {
        console.log('[ERROR] error connect to ' + target.host + ':' + target.port);
        console.log('make sure device is connected and address:port is correct. abort..');
        callback('error connect to device', null);

    });
}

app.get('/cmd', function(req, res) {
    var cmd = req.param('cmd');

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
