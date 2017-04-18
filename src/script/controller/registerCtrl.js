/*
* @Author: micheal
* @Date:   2017-03-04 17:06:20
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-28 11:46:25
*/

	'use strict';
	app.controller('registerCtrl',['$scope','$http','$interval','$state',function($scope,$http,$interval,$state){
		$scope.submit=function(){
			$http.post('data/regist.json',$scope.user).then(function(resp){
				$state.go('login');
				console.log(resp);
			})
		}
		var count = 60;
		$scope.send=function(){
			$http.get('data/code.json').then(function(resp){
				if(1===resp.data.state){
					console.log(1);
					count=60;
					$scope.time="60s";
					var interval=$interval(function(){
						if(count<=0){
							$interval.cancel(interval);
							$scope.time='';
							return;
						}else{
							count--;
							$scope.time=count+'s';
						}
					},1000);
				}
			})
		}	
	}]);
