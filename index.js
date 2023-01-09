/**
 * without https
*/

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(8890, function () {
    console.log('Listening on Port: 8890');
});

/**
 * With Https 
 */

/* var app = require('express')();
var fs = require('fs');
var https = require('https').createServer({
    key: fs.readFileSync('/etc/ssl/private/apache-selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/apache-selfsigned.crt')
}, app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.writeHead(200, { "coolHeader": "YesIAm" });
    res.writeHead(500);
    next();
}); 

var io = require('socket.io')(https);
var redis = require('redis');
https.listen(8890);

*/


io.on('connection', function (socket) {
    console.log('new client connected');
    var redisClient = redis.createClient();

    redisClient.subscribe('message');
    console.log('Message');
    redisClient.on("message", function (channel, data) {
        console.log('message socket Called : -', channel);
        //alert('dd')
        socket.emit(channel, data);
    });

    redisClient.subscribe('loadEkyc');
    console.log('loadEkyc');
    redisClient.on("loadEkyc", function (channel, data) {
        console.log('loadEkyc Socket Called : -', channel);
        //alert('dd')
        socket.emit(channel, data);
    });

    redisClient.subscribe('loadEkycMenaul');
    console.log('loadEkycMenaul');
    redisClient.on("loadEkycMenaul", function (channel, data) {
        console.log('loadEkycMenaul socket Called : -', channel);
        //alert('dd')
        socket.emit(channel, data);
    });



    socket.on('disconnect', function () {
        redisClient.quit();
    });
});


