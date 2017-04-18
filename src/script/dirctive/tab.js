/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-21 17:51:35
*/

	'use strict';
	app.directive('appTab',function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/tab.html',
			replace:true,
			scope:{
				lists:'='
			}
			// link:function($scope){
			// 	$scope.back=function(){
			// 		window.history.back();
			// 	}
			// }
		}
	})