var WebSocketServer = require("websocket").Server
var http = require("http")
var express = require("express")
var app = express()
var path = require('path')
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))
app.get('/', function(req, res) {
    console.log('sending file '+__dirname+'/static/index.html');
    res.sendFile(__dirname + '/static/index.html');
});

var server = http.createServer(app)
server.listen(port, function() {
    console.log(new Date());
    console.log('Intese Defense Server is listening on port '+port);
});

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server});
console.log("websocket server created")

process.on('SIGTERM', server.close.bind(server))

wss.on("connection", function(ws) {
    var connection = request.accept('echo-protocol', request.origin);
    connections.push(connection);

    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
  
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
})
