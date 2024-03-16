'use strict';

var server = require('server');
var MyModel = require('*/cartridge/models/MyModel');
var Logger = require('dw/system/Logger');

function m1(req,res,next){
    Logger.debug("Middleware 1 called")
    next();
}
function m2(req,res,next){
    Logger.debug("Middleware 2 called")
    next();
}

server.get('Show',m1, m2, function (req, res, next) {
    var myModel = new MyModel();

    myModel.message = 'Hello from MyModel | By GET';
Logger.debug("form get mycontroller-show")
    res.render('/modeldisplay/mytemplate', {
        myModel: myModel
    });
    next();
});



module.exports = server.exports();
