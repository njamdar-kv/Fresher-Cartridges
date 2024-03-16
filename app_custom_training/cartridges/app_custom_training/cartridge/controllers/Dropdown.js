'use strict';

var server = require('server');
var Logger = require('dw/system/Logger');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
server.get('Start', csrfProtection.generateToken, function (req, res, next) {
    var actionUrl = URLUtils.url('Dropdown-Show');
    var SFRAnameform = server.forms.getForm('Dropdown');

    SFRAnameform.clear();
    res.render('/training/SFRAFormDropdown', {
        actionUrl: actionUrl,
        SFRAnameform: SFRAnameform,

    });
    next();
});
server.post('Show', csrfProtection.validateRequest, function (req, res, next) {
    var SFRAnameform = server.forms.getForm('Dropdown');
    var occ = SFRAnameform.hobbies.value;
    res.render('/training/DropdownResult', {
        Hobbies: occ
    });
    next();
});

module.exports = server.exports();