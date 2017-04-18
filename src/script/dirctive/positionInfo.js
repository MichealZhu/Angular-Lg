/*
* @Author: micheal
* @Date:   2017-03-07 16:44:55
* @Last Modified by:   micheal
* @Last Modified time: 2017-04-05 16:29:01
*/

	'use strict';
	app.directive('appPositionInfo',['$http',function($http){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/positionInfo.html',
			replace:true,
			scope:{
				isLogin: '=',
				pos:'='
			},
			link:function($scope){
				// $scope.test='a';
				$scope.$watch('pos',function(newVal){
					if(newVal){
						$scope.pos.select=$scope.pos.select|| false;
						// $scope.imgPath=$scope.pos.select?'image/star-active.png':'image/star.png';
					}
				})
				$scope.favorite=function(){
					$http.post('data/favorite.json',{
						id:$scope.pos.id,
						select: !$scope.pos.select
					}).then(function(){
						$scope.pos.select=!$scope.pos.select;
						console.log($scope.pos.select);
					});
				}
			}
		}
	}])





	