/*
* @Author: micheal
* @Date:   2017-03-04 17:06:20
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-27 14:16:16
*/

	'use strict';
	app.controller('postCtrl',['$scope','$http',function($scope,$http){

		$scope.tablist=[{
			id:'all',
			name:'全部'
		},{
			id:'pass',
			name:'面试邀请'

		},{
			id:'fail',
			name:'不合适'
		}]
		$http.get('data/myPost.json').then(function(resp){
			$scope.positionList=resp.data;
			console.log(resp);
		})
		$scope.filterObj={};
		$scope.tClick=function(id,name){
			switch(id){
				case 'all':
				    delete $scope.filterObj.state;
				    break;
				case 'pass':
					$scope.filterObj.state='1';
					break;

				case 'fail':
					$scope.filterObj.state='-1';
					break;	
			}
		}
		// $http.get('/data/positionList.json').then(function(resp){
		// 	$scope.list=resp.data;
			
		// });
		
	}]);
