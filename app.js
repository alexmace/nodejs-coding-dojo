var app = require('http').createServer(handler);
var io = require('socket.io').listen(app)
var fs = require('fs');

app.listen(8080);

function handler(req, res) {
	fs.readFile(__dirname + '/irc.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
}

var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'WooWeb', {
    channels: ['#wooweb'],
});

client.addListener('message', function(from, to, message) {
	console.log(from + ' => ' + to + ': ' + message);
	io.sockets.emit('news', { hello: '&lt;' + from + '&gt; ' + message });
});

client.addListener('join', function(channel, nick, message) {
	if (nick == 'WooWeb') {
		io.sockets.on('connection', function (socket) {
			
			socket.on('my other event', function (data) {
				console.log(data);
				client.say('#wooweb', data['my']);
			});
		});
	} 
})