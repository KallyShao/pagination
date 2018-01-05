/*
* @Author: Administrator
* @Date:   2018-01-05 17:05:07
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-05 17:31:55
*/

'use strict';
require('./index.css');

var _cf = require('util/cf.js');

var page = {
    data: {
        idPic: [],
        certificatePic: []
    },
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        //上传身份证照片

    

        $('#submit').click(function(){
            var formData = new FormData($('form')[0]);

            formData.append('myfile', $(':file')[0].files[0]);
            formData.append('myfile', $(':file')[1].files[0]);
            formData.append('alipay', $('#alipay').val());
            console.log(formData);
            $.ajax({
                url: '/cfmall/index.php/Home/Center/uppic',
                type: 'POST',
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function(res){
                    console.log(res);
                    console.log(typeof res);
                    // var res = res.split(',');
                    // console.log(res);
                },
                error: function(err){
                    console.log(err);
                    _cf.errorTips('上传出错了，请重试！')
                }
            })
        });


    }
 

};

$(function() {
    page.init();
})