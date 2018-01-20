/*
* @Author: Administrator
* @Date:   2018-01-18 18:42:05
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-18 19:12:32
*/

var pagination = require('util/jquery.pagination.js');

console.log($.type(pagination));
// $('.box').pagination();

var module = {
  exports: {}
};

(function(module, exports) {
  exports.multiply = function (n) { return n * 1000 };
}(module, module.exports))

var f = module.exports.multiply;

