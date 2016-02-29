var http = require("http");
var spawn = require('child_process').spawn;
http.createServer(function (request, response) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Send the response body as "Hello World"
    response.end('Hello World\n');
    var deploySh = spawn('deploy-test');
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(ip);   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');