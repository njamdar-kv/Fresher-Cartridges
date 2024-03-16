'use strict';
    var MyModel = require('*/cartridge/models/MyModel')
var server = require('server');
var page = module.superModule

server.extend(page);

// server.append('Show', function (req, res, next) {

//     var myModel = new MyModel();

//     // myModel.message = 'Hello from Custom MyModel | By Append';

//     res.render('/modeldisplay/mytemplate', {
//         myModel: myModel
//     });
//     next();
// });

server.prepend('Show', function (req, res, next) {
    var myModel = new MyModel();

    myModel.message = 'Hello from MyModel | By Prepend';

    res.render('/modeldisplay/mytemplate', {
        myModel: myModel
    });
    next();
});

module.exports = server.exports();
