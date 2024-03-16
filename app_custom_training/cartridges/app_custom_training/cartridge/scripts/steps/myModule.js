exports.execute = function (parameter, context) {
    try {
        var OrderMgr = require('dw/order/OrderMgr');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Order = require('dw/order/Order');
        var Calendar = require('dw/util/Calendar');
        var CampaignMgr = require('dw/campaign/CampaignMgr');
        var CouponMgr = require('dw/campaign/CouponMgr');
        var collections = require('*/cartridge/scripts/util/collections');
        var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
        var Logger = require('dw/system/Logger');
        // Get current date
        var currentDate = new Date();

        var coupons = CouponMgr.getCoupon('5% Off on next purchase');
        var query = 'creationDate > {0}';
        var ordersList = OrderMgr.queryOrders('status = {0}', 'creationDate DESC', 4);

        // Loop through the orders
        while (ordersList.hasNext()) {
            var order = ordersList.next();
            var email = order.customerEmail;
            var firstName = order.billingAddress.firstName;
            var lastName = order.billingAddress.lastName;
            var cname = '';
            collections.forEach(order.getAllProductLineItems(), function (productLineItem) {
                if (productLineItem.custom.cname) {
                    cname = productLineItem.custom.cname;
                }
            });

            var objectForEmail = {
                firstName: firstName,
                lastName: lastName,
                cname: cname,
                code: 'XHUS-W65A-RU6K-OG4K'
            };
            var emailObj = {
                to: email,
                subject: 'Your Custom Mobile Cover Order Confirmation + Exclusive Discount Inside!',
                from: 'no-reply@testorganization.com',
                type: emailHelpers.emailTypes.accountLocked
            };
            if (cname) {
                emailHelpers.sendEmail(emailObj, 'coupon/coupon', objectForEmail);
            }

            Logger.debug('Processed order number {0}', order.orderNo);
        }

    } catch (error) {
        var err = error;
        throw err
    }
}