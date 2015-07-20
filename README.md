#async trouble

this simple example shows the trouble I got due to async nature of javascript..

#setup

* install all the Dependencies using `npm install`
* start the web server using `node server.js`
* start the telnet server using `node telnetServer.js`
* install postman for chrome

#steps to reproduce

use postman to send request with following settings:

* url: localhost:3000
* method: GET. 
* param: key=cmd, value=blahblah

first send would work and see whatever the value for cmd param.
second send would crash the server..

#work around
if uncomment the block inside function sendTelnetCmd:

    telnetClient.destroy();
    telnetClient = null;

then it starts to work all the time.. but the trouble is every command will
cause socket to be open/closed again which is not optimal..
