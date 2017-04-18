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