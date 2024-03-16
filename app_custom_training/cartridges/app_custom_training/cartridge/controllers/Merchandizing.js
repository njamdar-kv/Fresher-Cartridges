'use strict';

var server = require('server');

server.get('Show',function(req,res,next){
    res.render('/content/sample')
    next();
})

module.exports = server.exports();