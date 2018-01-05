/*
* @Author: Administrator
* @Date:   2018-01-05 12:56:17
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-05 13:30:00
*/


require('util/fileupload/index.js');

$(function(){  
    //点击打开文件选择器  
    $("#upload").on('click', function() {  
        $('#fileToUpload').click();  
        // console.log($.ajaxFileUpload);
    });  
      
    //选择文件之后执行上传  
    $('#fileToUpload').on('change', function() {  
        $.ajaxFileUpload({  
            url:'/cfmall/index.php/Home/Center/uppic',  
            secureuri:false,  
            fileElementId:'fileToUpload',//file标签的id  
            dataType: 'json',//返回数据的类型  
            data:{name:'logan'},//一同上传的数据  
            success: function (data, status) {  
                //把图片替换  
                // var obj = jQuery.parseJSON(data);  
                // $("#upload").attr("src", "../image/"+obj.fileName);  
      			console.log(data);
      			console.log(status);

                if(typeof(data.error) != 'undefined') {  
                    if(data.error != '') {  
                    	console.log(data.error);
                    } else {  
                    	console.log(data.msg);
                    }  
                }  
            },  
            error: function (data, status, e) {  
            	console.log(e);
            }  
        });  
    });  
      
});  