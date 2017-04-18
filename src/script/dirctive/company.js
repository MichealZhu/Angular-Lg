/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-16 16:32:16
*/

	'use strict';
	app.directive('appCompany',function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/company.html',
			replace:true,
			scope:{
				com: '='
			}
		}
	})