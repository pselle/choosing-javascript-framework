#!/usr/bin/env node

/**
 * Simple static file server.
 * 
 * Usage:
 * 
 * ./serve.js
 * 
 */

var Server = require('node-static').Server,
    fileServer = new Server('.');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(8080);