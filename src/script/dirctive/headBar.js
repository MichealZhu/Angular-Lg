/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-15 17:11:46
*/

	'use strict';
	app.directive('appHeadBar',function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/headBar.html',
			replace:true,
			scope:{
				text:'@'
			},
			link:function($scope){
				$scope.back=function(){
					window.history.back();
				}
			}
		}
	})