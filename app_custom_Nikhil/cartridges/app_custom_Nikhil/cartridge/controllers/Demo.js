'use strict';

var server = require('server');

server.get("Show",function(req,res,next) {
    res.render('/my/myisml');
    next()
})

module.exports = server.exports();