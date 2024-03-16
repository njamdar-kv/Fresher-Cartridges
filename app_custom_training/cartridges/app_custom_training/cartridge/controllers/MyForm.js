'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var cache = require('*/cartridge/scripts/middleware/cache');
server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    res.render('/forms/myform', {
        actionUrl: URLUtils.url('MyForm-Submit').toString()
    });
    next();
});

server.post('Submit', function (req, res, next) {
    var myform = req.form;
    res.json({
        success: true,
        msg: { "First Name": myform.fname, "Last Name": myform.lname }
    })
    // res.render('/forms/myform');

    next();
})
module.exports = server.exports(); 