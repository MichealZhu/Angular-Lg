/*
* @Author: micheal
* @Date:   2017-03-04 17:06:20
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-28 10:47:39
*/

	'use strict';
	app.controller('favouriteCtrl',['$scope','$http',function($scope,$http){
		$http.get('/data/myFavorite.json').then(function(resp){
			$scope.list=resp.data;
			console.log(resp.data[0].select);
		});
		// $scope.list=[{
		// 	id:'1',
		// 	name:'销售',
		// 	imgSrc:'image/company-3.png',
		// 	companyName:'千度',
		// 	city:'上海',
		// 	industry:'互联网',
		// 	time:'2016-06-01-01 11:05'
		// },{
		// 	id:'2',
		// 	name:'销售',
		// 	imgSrc:'image/company-3.png',
		// 	companyName:'千度',
		// 	city:'北京',
		// 	industry:'互联网',
		// 	time:'2016-06-01-01 11:05'
		// }

		// ];
	}]);
