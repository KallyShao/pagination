/*
 * @Author: Administrator
 * @Date:   2017-12-12 09:06:55
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-12-15 14:20:02
 */

require('./index.css');


var pagination = require('pagination')

var boostrapPaginator = new pagination.TemplatePaginator({
	prelink:'/', current: 3, rowsPerPage: 200,
	totalResult: 10020, slashSeparator: true,
	template: function(result) {
		var i, len, prelink;
		var html = '<div><ul class="pagination">';
		if(result.pageCount < 2) {
			html += '</ul></div>';
			return html;
		}
		prelink = this.preparePreLink(result.prelink);
		if(result.previous) {
			html += '<li><a href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
		}
		if(result.range.length) {
			for( i = 0, len = result.range.length; i < len; i++) {
				if(result.range[i] === result.current) {
					html += '<li class="active"><a href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
				} else {
					html += '<li><a href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
				}
			}
		}
		if(result.next) {
			html += '<li><a href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
		}
		html += '</ul></div>';
		return html;
	}
});
console.log(boostrapPaginator.render());

$('#data-container').html(boostrapPaginator.render());