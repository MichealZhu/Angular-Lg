/*
* @Author: micheal
* @Date:   2017-03-09 17:20:57
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-20 11:41:23
*/

	'use strict';
	app.controller('companyCtrl',['$scope','$state','$http',function($scope,$state,$http){
		$http.get('/data/company.json?id='+$state.params.id).then(function(resp){
				$scope.company=resp.data;
				// console.log(resp.data);
			});
	}]);

	// app.controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
	// 	$http.get('/data/company.json?id='+$state.params.id).then(function(resp){
	// 		// $scope.list=resp.data;
	// 		console.log(resp.data);
	// 	});
	// }]);