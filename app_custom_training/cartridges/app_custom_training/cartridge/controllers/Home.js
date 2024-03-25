'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
/**
 * @namespace Home
 */
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append('Show', function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
    res.render('home/homePage');
    next();
}, pageMetaData.computedPageMetaData);

server.get('Data', function (req, res, next) {
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var collections = require('*/cartridge/scripts/util/collections');
    var isLoggedIn = customer.authenticated;
    if (isLoggedIn) {
        // var info = customer.profile;
        // var customergrp = info.customer.customermenuGroups[2].ID;
        var customergrp = '';
        var email = customer.profile.email;
        var customer1 = CustomerMgr.getCustomerByLogin(email);
        // var isLoggedIn = customer1.authenticated;
        // // var customergrp = customer1.customerGroups[2].ID;

        collections.forEach(customer1.customerGroups, function (customerGroups) {
            if (customerGroups.ID == 'LoyalCustomers') {
                customergrp = customerGroups.ID;// eslint-disable-line no-param-reassign
            }
        });
    }
    if (isLoggedIn && customergrp === 'LoyalCustomers') {
        res.render('home/myBanner')
        next();
    } else {
        res.render('home/myDefaultBanner')
        next();

    }

});

server.replace('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

module.exports = server.exports();
