'use strict';

var _cf = require('util/cf.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _cf.request({
            url     : _cf.getServerUrl('/cfmall/index.php/Home/SMList/SMList'),
            // method  : 'POST',
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _cf.request({
            url     : _cf.getServerUrl('/cfmall/index.php/Home/SMList/SMListDetails'),
            // url     : _cf.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;