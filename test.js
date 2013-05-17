var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'WooWeb', {
    channels: ['#wooweb'],
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

client.addListener('message', function(from, to, message) {
	console.log(from + ' => ' + to + ': ' + message);
	if (to == 'WooWeb') {
		client.say('#wooweb', 'thanks');
	}
});

client.addListener('join', function(channel, nick, message) {
	if (nick == 'WooWeb') {
		client.say("#wooweb", "HELLO EVERYONE IN " + channel);
	} else {
		client.say("#wooweb", "HELLO " + nick + ', WELCOME TO ' + channel);
	}
})

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  client.say('#wooweb', 'WEB REQUEST AMAZEBALLS');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');