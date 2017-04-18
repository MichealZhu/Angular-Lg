/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-28 11:46:46
*/

	'use strict';
	app.directive('appHead',['cache',function(cache){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/head.html',
			replace:true,
			link: function($scope){
				$scope.name=cache.get('name');
			}
		}

	}]);