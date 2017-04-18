/*
* @Author: micheal
* @Date:   2017-03-02 19:38:39
* @Last Modified by:   micheal
* @Last Modified time: 2017-04-05 21:40:28
*/

	'use strict';
	var app=angular.module('app',['ui.router','ngCookies','validation','ngAnimate']);
	/*
	* @Author: micheal
	* @Date:   2017-03-22 08:38:49
	* @Last Modified by:   micheal
	* @Last Modified time: 2017-03-25 22:41:19
	*/

	'use strict';
	app.config(['$provide',function($provide){
		$provide.decorator('$http',['$delegate','$q',function($delegate,$q){
			$delegate.post=function(url,data,config){
				var def=$q.defer();
				$delegate.get(url).then(function(resp){
					def.resolve(resp)
				}).catch(function(){
					def.reject(err);
				})
				return{
					then:function(cb){
						def.promise.then(cb);
					},
					catch:function(cb){
						def.promise.then(null,cb);
					}
				}
			}
			return $delegate;
		}])
	}]);

/*
* @Author: micheal
* @Date:   2017-03-04 09:28:33
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-28 11:37:31
*/

	'use strict';
	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$stateProvider.state('main',{
			url:'/main',
			templateUrl:'view/main.html',
			controller:'mainCtrl'
		}).state('position',{
			url:'/position/:id',
			templateUrl:'view/position.html',
			controller:'positionCtrl'
		}).state('company',{
			url:'/company/:id',
			templateUrl:'view/company.html',
			controller:'companyCtrl'
		}).state('search',{
			url:'/search',
			templateUrl:'view/search.html',
			controller:'searchCtrl'
		}).state('login',{
			url:'/login',
			templateUrl:'view/login.html',
			controller:'loginCtrl'
		}).state('register',{
			url:'/register',
			templateUrl:'view/register.html',
			controller:'registerCtrl'
		}).state('me',{
			url:'/me',
			templateUrl:'view/me.html',
			controller:'meCtrl'
		}).state('post',{
			url:'/post',
			templateUrl:'view/post.html',
			controller:'postCtrl'
		}).state('favourite',{
			url:'/favourite',
			templateUrl:'view/favourite.html',
			controller:'favouriteCtrl'
		});
		$urlRouterProvider.otherwise('main')
	}])
	/*
	* @Author: micheal
	* @Date:   2017-03-22 08:38:49
	* @Last Modified by:   micheal
	* @Last Modified time: 2017-03-25 23:36:52
	*/

	'use strict';
	app.config(['$validationProvider',function($validationProvider){
		var expression ={
		phone: /^1[\d]{10}/,
		password:function(value){
			var str =value +'';
			return str.length >5;
		},
		required: function(value){
			return value;
		}
		};
		var defaultMsg={
			phone:{
				success:'',
				error:'必须要是11位手机号'
			},
			password:{
				success:'',
				error:'长度至少6位'
			},
			required:{
				success:'',
				error:'不能为空'
			}
		};
		$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
	}]);

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
/*
* @Author: micheal
* @Date:   2017-03-04 17:06:20
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-16 14:06:11
*/

	'use strict';
	app.controller('mainCtrl',['$scope','$http',function($scope,$http){
		$http.get('/data/positionList.json').then(function(resp){
			$scope.list=resp.data;
			// console.log(resp.data);
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

/*
* @Author: micheal
* @Date:   2017-03-04 17:06:20
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-28 11:38:55
*/

	'use strict';
	app.controller('searchCtrl',['$scope','$http',function($scope,$http){
		// $http.get('/data/positionList.json').then(function(resp){
		// 	$scope.list=resp.data;
		// 	// console.log(resp.data);
		// });
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

/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-16 16:32:16
*/

	'use strict';
	app.directive('appCompany',function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/company.html',
			replace:true,
			scope:{
				com: '='
			}
		}
	})
/*
* @Author: micheal
* @Date:   2017-03-04 19:36:27
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-04 20:43:32
*/

	'use strict';
	
/*
* @Author: micheal
* @Date:   2017-03-05 16:52:05
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-05 17:39:57
*/

	'use strict';
	app.directive('appFoot',[function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/foot.html',
			replace:true
		}
	}])	
/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-28 11:46:46
*/

	'use strict';
	app.directive('appHead',['cache',function(cache){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/head.html',
			replace:true,
			link: function($scope){
				$scope.name=cache.get('name');
			}
		}

	}]);
/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-15 17:11:46
*/

	'use strict';
	app.directive('appHeadBar',function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/headBar.html',
			replace:true,
			scope:{
				text:'@'
			},
			link:function($scope){
				$scope.back=function(){
					window.history.back();
				}
			}
		}
	})
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

/*
* @Author: micheal
* @Date:   2017-03-04 21:10:42
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-21 17:51:35
*/

	'use strict';
	app.directive('appTab',function(){
		return{
			restirct:'ECMA',
			templateUrl:'view/template/tab.html',
			replace:true,
			scope:{
				lists:'='
			}
			// link:function($scope){
			// 	$scope.back=function(){
			// 		window.history.back();
			// 	}
			// }
		}
	})
/*
* @Author: micheal
* @Date:   2017-03-17 11:32:54
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-17 13:17:18
*/

	'use strict';
	app.service('cache',['$cookies',function($cookies){
		this.put=function(key,value){
			$cookies.put(key,value);
		};
		this.get=function(key){
			return $cookies.get(key);
		};
		this.remove=function(key){
			$cookies.remove(key);
		}
	}])