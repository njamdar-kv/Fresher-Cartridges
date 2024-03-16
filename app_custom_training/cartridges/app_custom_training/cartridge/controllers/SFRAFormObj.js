'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.get('Start', csrfProtection.generateToken, function (req, res, next) {
    var actionURL = URLUtils.url('SFRAFormObj-Show');
    var SFRAhelloform = server.forms.getForm('SFRAFormDefObj');
    SFRAhelloform.clear();
    res.render('/training/SFRAFormTemplateObj', {
        actionURL: actionURL,
        SFRAhelloform: SFRAhelloform,
    });
    next();
});
server.post('Show', csrfProtection.validateRequest, function (req, res, next) {
    var Transaction = require('dw/system/Transaction');
    var SFRAhelloform = server.forms.getForm('SFRAFormDefObj');
    var occupation = SFRAhelloform.occupation.value;

    if(customer.authenticated){
        Transaction.wrap(function(){
            customer.profile.custom.occupation = occupation;
        });
    }
        res.render('/training/SFRAResultTemplateObj', {
            occupation:occupation
        });
        next();
});
module.exports = server.exports();
