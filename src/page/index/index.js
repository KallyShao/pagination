/*
 * @Author: Administrator
 * @Date:   2017-12-12 09:06:55
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-12-17 21:44:55
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
		productList: null,
		pageSize: 3,
		listParam : {
		    keyword         : 'i',
		    // keyword         : _cf.getUrlParam('keyword')    || '',
		    // categoryId      : _cf.getUrlParam('categoryId') || '',
		    // orderBy         : _cf.getUrlParam('orderBy')    || 'default',
		    // pageNum         : _cf.getUrlParam('pageNum')    || 1,
		    // pageSize        : _cf.getUrlParam('pageSize')   || 20
		    // pageSize        : _cf.getUrlParam('pageSize')   || 2
		},
		pageParam: {
			hasPreviousPage : false,	//是否有前一页
			prePage         : 0,		//前一页是几(num)
			hasNextPage     : false,
			nextPage        : 0,
			pageNum         : 1,	//当前页
			pages           : 10	//总页数
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
		    listParam   = this.data.listParam,
		    pageParam   = this.data.pageParam;
		$pListCon   = $('.p-list-con');
		$pListCon.html('<div class="loading"></div>');

		_product.getProductList(listParam, function(res){
			//console.log(res.list);
			_this.data.productList = res.list;
			// console.log(_this.data.productList);
			var listLen = res.list.length;
			_this.data.pageParam.pages = Math.ceil(listLen / _this.data.pageSize);
			console.log(_this.data.pageParam.pages);
			if(_this.data.pageParam.pages > 1){
				_this.data.pageParam.hasNextPage = true;
			}

			var resList;
			if(_this.data.pageParam.pages > 1){
            	//前pageSize个
            	resList = _this.data.productList.slice(0, _this.data.pageSize);
            }else{
            	resList = res.list;
            }

			listHtml = _cf.renderHtml(templateIndex, {
                list :  resList
            });
            $pListCon.html(listHtml);

			_this.loadPagination(pageParam);	//这里你的pageParam就是形参pageInfo

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
	   			//_this.data.pageParam.pageNum = pageNum;
	   			//_this.loadList();
	   			_this.data.pageParam.pageNum = pageNum;
	   			if(_this.data.pageParam.pages > pageNum){
	   				_this.data.pageParam.hasNextPage = true;
	   				_this.data.pageParam.nextPage = pageNum + 1;
	   			} else {
	   				_this.data.pageParam.hasNextPage = false;
	   			}

	   			if(pageNum <= 1){
	   				_this.data.pageParam.hasPreviousPage = false;
	   			}else{
	   				_this.data.pageParam.hasPreviousPage = true;
	   				_this.data.pageParam.prePage = pageNum - 1;
	   			}
	   			
				var resList;
				if(_this.data.pageParam.pages > pageNum){
					// resList = _this.data.productList[pageNum * 10: pageNum * 10 + 10];
					resList = _this.data.productList.slice((pageNum -1) * _this.data.pageSize, pageNum * _this.data.pageSize);
				}else{
					// resList = _this.data.productList[pageNum * 10: ]
					resList = _this.data.productList.slice((pageNum -1) * _this.data.pageSize);
				}

				listHtml = _cf.renderHtml(templateIndex, {
                	list :  resList
            	});
            	$pListCon.html(listHtml);
				_this.loadPagination(_this.data.pageParam);
	   		}
	   }));
	}
}

$(function(){
	page.init();
})

