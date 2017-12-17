/*
 * @Author: Administrator
 * @Date:   2017-12-12 09:06:55
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-12-17 14:35:12
 */

require('./index.css');
// require('page/common/nav/index.js');
// require('page/common/header/index.js');

var _cf             = require('util/cf.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');


var page = {
	data:{
		listParam : {
		    keyword         : 'i',
		    // keyword         : _cf.getUrlParam('keyword')    || '',
		    // categoryId      : _cf.getUrlParam('categoryId') || '',
		    // orderBy         : _cf.getUrlParam('orderBy')    || 'default',
		    // pageNum         : _cf.getUrlParam('pageNum')    || 1,
		    // pageSize        : _cf.getUrlParam('pageSize')   || 20
		    pageSize        : _cf.getUrlParam('pageSize')   || 2
		}
	},
	init: function(){
		this.onLoad();
		// this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	loadList: function(){
		var _this       = this,
		    listHtml    = '',
		    listParam   = this.data.listParam;
		    $pListCon   = $('.p-list-con');
		$pListCon.html('<div class="loading"></div>');

		_product.getProductList(listParam, function(res){
			console.log(res.list);

			listHtml = _cf.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);

			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,	//是否有前一页
				prePage         : res.prePage,	//前一页是几(num)
				hasNextPage     : res.hasNextPage,
				nextPage        : res.nextPage,
				pageNum         : res.pageNum,	//当前页
				pages           : res.pages
			})

		}, function(errMsg){
			_cf.errorTips(errMsg);
		})
		
	},
	loadPagination : function(pageInfo){
		var _this = this;
	   this.pagination ? '' : (this.pagination = new Pagination());
	   //
	   this.pagination.render($.extend({}, pageInfo, {
	   		container: $('.pagination'),
	   		onSelectPage: function(pageNum){
	   			_this.data.listParam.pageNum = pageNum;
	   			_this.loadList();
	   		}
	   }));
	}
}

$(function(){
	page.init();
})

