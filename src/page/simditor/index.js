/*
* @Author: Administrator
* @Date:   2017-12-27 09:41:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-27 16:15:56
*/

// var Simditor = require('node_modules/simditor/')


require('node_modules/simditor/styles/simditor.css');
var Simditor = require('simditor');
var _cf = require('util/cf.js');



//ajax测试
// $('#btn').click(function(){
// 	$.ajax({
// 		url: '/product/list.d',
// 		method: 'GET',
// 		data: 'keyword=1',	//请求时传给服务器的数据，可以是普通对象，字符串或者数组
// 		dataType: 'json',
// 		success: function(data, textStatus, jqXHR){	//success接受3个参数，第一个是服务器返回的数据第二个是字符串描述的返回状态，
// 			console.log(data);	//返回的是服务器返回的所有数据
// 			console.log(textStatus);	//返回'success'，对请求状态的一个描述，但是这个和jqXHR对象中的statusText字段的内容又有所不同
// 			console.log(jqXHR);	//jqXHR对象，包括setRequestHeader, readyState, getAllResponseHeaders....
// 		},
// 		error: function(jqXHR, textStatus, errMsg){
// 			console.log(jqXHR);
// 			console.log(textStatus);	//请求出错的时候这里直接返回'error'
// 			console.log(errMsg);	//这里返回的是雨请求状态码相对应的具体文本信息
// 		}
// 	})
// })

//simditor测试
var editor = new Simditor({
  	textarea: $('#editor'),
	placeholder: '这里输入文字...',
	// toolbar: ['title', 'bold'],	//设置工具栏的选项，默认为true,显示所有选项
	toolbar: true,	
	toolbarFloat: true,
	pasteImage: true,	//默认false
	defaultImage: 'http://img.happymmall.com/dce7d4e1-98f2-485c-a365-e70015c780a1.jpg',	//富文本区域图片上传的一个占位，一般可以设为图片上传失败时候的一个默认图片
	params: {name: '', value: ''},
	upload: {
		url: _cf.getServerUrl('/manage/product/richtext_img_upload.do'),
		params: null,	//上传图片时传给server的其他参数
		fileKey: "fileName",
		connectionCount: 3
	}
});
