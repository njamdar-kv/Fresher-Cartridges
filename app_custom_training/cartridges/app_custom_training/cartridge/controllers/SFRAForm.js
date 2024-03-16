'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
server.get('Start', csrfProtection.generateToken, function (req, res, next) {
    var query = req.querystring;
    var errmsg = query && query.message || " "
    var actionURL = URLUtils.url('SFRAForm-Show');
    var SFRAhelloform = server.forms.getForm('SFRAFormDef');
    SFRAhelloform.clear();
    res.render('/training/SFRAFormTemplate', {
        actionURL: actionURL,
        SFRAhelloform: SFRAhelloform,
        message:errmsg
    });
    next();
});
server.post('Show', csrfProtection.validateRequest, function (req, res, next) {
    var SFRAhelloform = server.forms.getForm('SFRAFormDef');
    var firstName = SFRAhelloform.firstName.value;
    var lastName = SFRAhelloform.lastName.value;
    var message = "";

    if (empty(firstName) || empty(lastName)) {
        message = "fname lnam empty";
        var actionURL = URLUtils.url('SFRAForm-Start');
        res.redirect(actionURL + '?message=' +message )
        next();
    } else {
        res.render('/training/SFRAResultTemplate', {
            firstName: firstName,
            lastName: lastName
        });
        next();
    }
});
module.exports = server.exports();
