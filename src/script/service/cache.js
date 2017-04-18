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