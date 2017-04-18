/*
* @Author: micheal
* @Date:   2017-03-07 16:44:55
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-20 14:35:01
*/

	'use strict';
	app.directive('appPositionClass',function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/positionClass.html',
			replace:true,
			scope:{
				// data: '=',
				com: '='
			},
			link: function($scope){
				// $scope.isActive=0;
				$scope.showPositionList=function(idx){
					$scope.positionList=$scope.com.positionClass[idx].positionList;
					$scope.isActive=idx;
				}
				$scope.$watch('com',function(newVal){
					if(newVal){
						$scope.showPositionList(0);
					}
				})
				// $scope.showPositionList(0);
				// $scope.showPositionList(0);
			}
		};
	});
