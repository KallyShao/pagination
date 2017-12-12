/*
 * @Author: Administrator
 * @Date:   2017-12-12 09:06:55
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-12-12 10:26:59
 */

require('./index.css');
require('node_modules/pagination/release/pagination.full.min.js');
var pagination = require('pagination');

// console.log(pagination);

// (function() {
//     var paginator = new pagination.ItemPaginator({ prelink: '/', current: 3, rowsPerPage: 200, totalResult: 10020 });
//     var html = paginator.render();
//     var paginator = pagination.create('search', { prelink: '/', current: 1, rowsPerPage: 200, totalResult: 10020 });
//     html += paginator.render();
//     var ele = document.getElementById("paging");
//     console.log(ele);
//     ele.innerHTML = html;
// })();

var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
console.log(paginator.render());