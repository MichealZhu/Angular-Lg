	/*
	* @Author: micheal
	* @Date:   2017-03-22 08:38:49
	* @Last Modified by:   micheal
	* @Last Modified time: 2017-03-25 23:36:52
	*/

	'use strict';
	app.config(['$validationProvider',function($validationProvider){
		var expression ={
		phone: /^1[\d]{10}/,
		password:function(value){
			var str =value +'';
			return str.length >5;
		},
		required: function(value){
			return value;
		}
		};
		var defaultMsg={
			phone:{
				success:'',
				error:'必须要是11位手机号'
			},
			password:{
				success:'',
				error:'长度至少6位'
			},
			required:{
				success:'',
				error:'不能为空'
			}
		};
		$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
	}]);
