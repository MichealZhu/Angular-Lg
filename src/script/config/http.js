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
