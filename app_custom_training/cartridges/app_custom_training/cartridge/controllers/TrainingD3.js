'use strict';
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    var name = req.querystring.name;
    res.render('/day3/ismltd',{name:name});
    next();
});
module.exports = server.exports(); 