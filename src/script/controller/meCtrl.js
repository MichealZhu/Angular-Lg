/*
* @Author: micheal
* @Date:   2017-03-04 17:06:20
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-26 22:51:26
*/

	'use strict';
	app.controller('meCtrl',['$state','cache','$scope','$http',function($state,cache,$scope,$http){
			if(cache.get('name')){
				$scope.name=cache.get('name');
				$scope.image=cache.get('image');
			}
			$scope.logout=function(){
				cache.remove('id');
				cache.remove('name');
				cache.remove('image');
				$state.go('main');
			}
	}]);
