'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);
/**
 * Page-IncludeHeaderMenu : This is a local include that includes the navigation in the header
 * @name Base/Page-IncludeHeaderMenu
 * @function
 * @memberof Page
 * @param {middleware} - server.middleware.include
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append(
    'IncludeHeaderMenu',
    function (req, res, next) {
        var catalogMgr = require('dw/catalog/CatalogMgr');
        var Categories = require('*/cartridge/models/categories');

        var siteRootCategory = catalogMgr.getSiteCatalog().getRoot();

        var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ? siteRootCategory.getOnlineSubCategories() : null;

        res.render('/components/header/menu', {
            menuCat: new Categories(topLevelCategories)
        });
        next();
    }
);
server.get('Menu', function (req, res, next) {
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var Categories = require('*/cartridge/models/categories');
    var catalogMgr = require('dw/catalog/CatalogMgr');
    var collections = require('*/cartridge/scripts/util/collections');
    var isLoggedIn = customer.authenticated;
    var customergrp = '';
    if (isLoggedIn) {
        var email = customer.profile.email;
        var customer1 = CustomerMgr.getCustomerByLogin(email);
        collections.forEach(customer1.customerGroups, function (customerGroups) {
            if (customerGroups.ID === 'LoyalCustomers') {
                customergrp = customerGroups.ID;
            }
        });
    }
    var siteRootCategory = catalogMgr.getSiteCatalog().getRoot();
    var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ? siteRootCategory.getOnlineSubCategories() : null;
    if (isLoggedIn && customergrp === 'LoyalCustomers') {
        res.render('/components/header/customMenu', {
            isLoggedIn: isLoggedIn,
        });
        next();
    }

})
module.exports = server.exports();