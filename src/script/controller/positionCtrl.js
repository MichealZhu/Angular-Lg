/*
* @Author: micheal
* @Date:   2017-03-09 17:20:57
* @Last Modified by:   micheal
* @Last Modified time: 2017-04-05 16:38:23
*/

	'use strict';
	app.controller('positionCtrl',['$q','cache','$scope','$state','$http',function($q,cache,$scope,$state,$http){
		// cache.remove('to');
		// if(cache.get('name')){
		// 	$scope.isLogin=true;
		// }else{
		// 	$scope.isLogin=false;
		// }
		// console.log(!!cache.get('name'));
		$scope.isLogin= !!cache.get('name');
		$scope.message=$scope.isLogin?'投个简历':'去登录';
		// console.log($scope.isLogin);
		function getPosition (){
			var def=$q.defer();
			$http.get('/data/position.json?id='+$state.params.id).then(function(resp){
				$scope.position=resp.data;
				// console.log(resp);
				def.resolve(resp.data);
			});
			return def.promise;
		}
		function getCompany(id){
			$http.get('/data/company.json?id='+id).then(function(resp){
				$scope.company=resp.data;
			})
		}
		getPosition().then(function(obj){
			getCompany(obj.companyId);
		});
		$scope.go=function(){
			if($scope.message !=='已投递'){
				if($scope.isLogin){
					$http.post('data/handle.json',{
						id: $scope.position.id
					}).then(function(resp){
						console.log(resp);
						$scope.message="已投递";
					});
				}else{
					$state.go('login');
				}
			}
		}
	}]);