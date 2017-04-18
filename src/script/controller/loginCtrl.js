/*
* @Author: micheal
* @Date:   2017-03-04 17:06:20
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-26 17:53:21
*/

	'use strict';
	app.controller('loginCtrl',['cache','$scope','$http','$interval','$state',function(cache,$scope,$http,$interval,$state){
		$scope.submit=function(){
			$http.post('data/login.json',$scope.user).then(function(resp){
				cache.put('id',resp.data.id);
				cache.put('name',resp.data.name);
				cache.put('image',resp.data.image);
				$state.go('main');
			})
		}
	}]);