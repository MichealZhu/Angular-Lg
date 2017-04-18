/*
* @Author: micheal
* @Date:   2017-03-07 16:44:55
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-28 11:18:27
*/

	'use strict';
	app.directive('appPositionList',['$http',function($http){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/positionList.html',
			replace:true,
			scope:{
				data: '=',
				filterObj: '=',
				isFavorite: '='
			},
			link: function($scope){
				$scope.select=function(item){
					$http.post('data/favorite.json',{
						id:item.id,
						select: !item.select
					}).then(function(){
						item.select=!item.select;
					})

				}
			}
		}
	}]);
