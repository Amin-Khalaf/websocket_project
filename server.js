var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var path = require('path');

app.use(express.static('public'))
//app.use(static(join(__dirname, '/public')));
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function (socket) {
    console.log("a user is connected");
    socket.on('disconnect', function () {
        console.log("a user is disconnected");
    })
    socket.on('chat message', function (msg) {
        console.log('message reçu : ' + msg);
        io.emit('chat message', msg);
    })
})

http.listen(3000, function () {
    console.log('server running ' + 'now ' + Date.now());
    console.log("Server running on 3000");
})