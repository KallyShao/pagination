/*
* @Author: Administrator
* @Date:   2017-12-16 14:03:51
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-16 15:30:54
*/

'use strict';

require('./index.css');
var templatePagination = require('./index.string');

var Pagination = function(){
	this.defaultOption = {
		container: null,
		pageNum : 1,
		pageRange: 3,	//左右浮动的范围
		onSelectPage: null	//回调
	};
}
//渲染分页组件，userOption是自定义的参数
Pagination.prototype.render = function(userOption){
	//合并选项，如果有用户自定义参数，就使用自定义参数；最前面{}是为了？？？？
	this.option = $.extend({}, this.defaultOption, userOption);
	if(!this.option.container instanceOf jQuery){	//看option中的container是不是jq对象
		return;
	}
	//判断分页是否只有1页，如果只有1页就不显示分页组件
	if(this.option.pages <= 1){	
		return;
	}
	//渲染分页内容
	this.option.container.html(this.getPaginationHtml());
};
//获取分页的html
// 样式：|上一页| 2 3 4 =5= 6 7 8|下一页|  5/9

Pagination.prototype.getPaginationHtml = function(){
	var html = '',
		option = this.option,
		pageArray = [],
		start = option.pageNum - option.pageRange > 0	//start是页码显示的起始页，end是显示的最终页
			? option.pageNum - option.pageRange : 1,
		end = option.pageNum + option.pageRange < pages
			?  option.pageNum + option.pageRange : pages;
		//上一页按钮的数据
		pageArray.push({
			name: '上一页',
			value: this.option.prePage,
			disabled: !this.option.hasPreviousPage

		})
		//数字按钮的处理
		for(var i= start; i <= end; i++){
			pageArray.push({
				name: i,
				value: i,
				active: (i === option.pageNum)
			})；
		}




};