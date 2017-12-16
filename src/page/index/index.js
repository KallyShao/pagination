/*
 * @Author: Administrator
 * @Date:   2017-12-12 09:06:55
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-12-16 14:16:09
 */

require('./index.css');

var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');


var page = {
	data:{
		listParam : {
		    keyword         : _mm.getUrlParam('keyword')    || '',
		    categoryId      : _mm.getUrlParam('categoryId') || '',
		    orderBy         : _mm.getUrlParam('orderBy')    || 'default',
		    pageNum         : _mm.getUrlParam('pageNum')    || 1,
		    pageSize        : _mm.getUrlParam('pageSize')   || 20
		}
	},
	loadList: function(){
		var _this       = this,
		    listHtml    = '',
		    listParam   = this.data.listParam;
		    // $pListCon   = $('.p-list-con');
		_product.getProductList(listParam, function(res){
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage         : res.prePage,
				hasNextPage     : res.hasNextPage,
				nextPage        : res.nextPage,
				pageNum         : res.pageNum,
				pages           : res.pages
			})

		}, function(errMsg){
			_mm.errorTips(errMsg);
		})
		
	},
	loadPagination : function(pageInfo){
	   this.pagination ? '' : (this.pagination = new Pagination());
	   this.pagination.render({

	   });
	}
}

$(function(){
	page.init();
})

