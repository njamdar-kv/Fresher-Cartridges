'use strict';
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    res.render('/training/myisml');
    next();
});
module.exports = server.exports(); 