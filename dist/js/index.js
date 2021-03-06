"use strict";var app=angular.module("app",["ui.router","ngCookies","validation","ngAnimate"]);app.config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(t,e){return t.post=function(o,n,i){var a=e.defer();return t.get(o).then(function(t){a.resolve(t)}).catch(function(){a.reject(err)}),{then:function(t){a.promise.then(t)},catch:function(t){a.promise.then(null,t)}}},t}])}]),app.config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("favourite",{url:"/favourite",templateUrl:"view/favourite.html",controller:"favouriteCtrl"}),e.otherwise("main")}]),app.config(["$validationProvider",function(t){var e={phone:/^1[\d]{10}/,password:function(t){var e=t+"";return e.length>5},required:function(t){return t}},o={phone:{success:"",error:"必须要是11位手机号"},password:{success:"",error:"长度至少6位"},required:{success:"",error:"不能为空"}};t.setExpression(e).setDefaultMsg(o)}]),app.controller("companyCtrl",["$scope","$state","$http",function(t,e,o){o.get("/data/company.json?id="+e.params.id).then(function(e){t.company=e.data})}]),app.controller("favouriteCtrl",["$scope","$http",function(t,e){e.get("/data/myFavorite.json").then(function(e){t.list=e.data,console.log(e.data[0].select)})}]),app.controller("loginCtrl",["cache","$scope","$http","$interval","$state",function(t,e,o,n,i){e.submit=function(){o.post("data/login.json",e.user).then(function(e){t.put("id",e.data.id),t.put("name",e.data.name),t.put("image",e.data.image),i.go("main")})}}]),app.controller("mainCtrl",["$scope","$http",function(t,e){e.get("/data/positionList.json").then(function(e){t.list=e.data})}]),app.controller("meCtrl",["$state","cache","$scope","$http",function(t,e,o,n){e.get("name")&&(o.name=e.get("name"),o.image=e.get("image")),o.logout=function(){e.remove("id"),e.remove("name"),e.remove("image"),t.go("main")}}]),app.controller("positionCtrl",["$q","cache","$scope","$state","$http",function(t,e,o,n,i){function a(){var e=t.defer();return i.get("/data/position.json?id="+n.params.id).then(function(t){o.position=t.data,e.resolve(t.data)}),e.promise}function r(t){i.get("/data/company.json?id="+t).then(function(t){o.company=t.data})}o.isLogin=!!e.get("name"),o.message=o.isLogin?"投个简历":"去登录",a().then(function(t){r(t.companyId)}),o.go=function(){"已投递"!==o.message&&(o.isLogin?i.post("data/handle.json",{id:o.position.id}).then(function(t){console.log(t),o.message="已投递"}):n.go("login"))}}]),app.controller("postCtrl",["$scope","$http",function(t,e){t.tablist=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}],e.get("data/myPost.json").then(function(e){t.positionList=e.data,console.log(e)}),t.filterObj={},t.tClick=function(e,o){switch(e){case"all":delete t.filterObj.state;break;case"pass":t.filterObj.state="1";break;case"fail":t.filterObj.state="-1"}}}]),app.controller("registerCtrl",["$scope","$http","$interval","$state",function(t,e,o,n){t.submit=function(){e.post("data/regist.json",t.user).then(function(t){n.go("login"),console.log(t)})};var i=60;t.send=function(){e.get("data/code.json").then(function(e){if(1===e.data.state){console.log(1),i=60,t.time="60s";var n=o(function(){return i<=0?(o.cancel(n),void(t.time="")):(i--,void(t.time=i+"s"))},1e3)}})}}]),app.controller("searchCtrl",["$scope","$http",function(t,e){}]),app.directive("appCompany",function(){return{restirct:"ECMA",templateUrl:"view/template/company.html",replace:!0,scope:{com:"="}}}),app.directive("appFoot",[function(){return{restirct:"ECMA",templateUrl:"view/template/foot.html",replace:!0}}]),app.directive("appHead",["cache",function(t){return{restirct:"ECMA",templateUrl:"view/template/head.html",replace:!0,link:function(e){e.name=t.get("name")}}}]),app.directive("appHeadBar",function(){return{restirct:"ECMA",templateUrl:"view/template/headBar.html",replace:!0,scope:{text:"@"},link:function(t){t.back=function(){window.history.back()}}}}),app.directive("appPositionClass",function(){return{restirct:"ECMA",templateUrl:"view/template/positionClass.html",replace:!0,scope:{com:"="},link:function(t){t.showPositionList=function(e){t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e){e&&t.showPositionList(0)})}}}),app.directive("appPositionInfo",["$http",function(t){return{restirct:"ECMA",templateUrl:"view/template/positionInfo.html",replace:!0,scope:{isLogin:"=",pos:"="},link:function(e){e.$watch("pos",function(t){t&&(e.pos.select=e.pos.select||!1)}),e.favorite=function(){t.post("data/favorite.json",{id:e.pos.id,select:!e.pos.select}).then(function(){e.pos.select=!e.pos.select,console.log(e.pos.select)})}}}}]),app.directive("appPositionList",["$http",function(t){return{restirct:"ECMA",templateUrl:"view/template/positionList.html",replace:!0,scope:{data:"=",filterObj:"=",isFavorite:"="},link:function(e){e.select=function(e){t.post("data/favorite.json",{id:e.id,select:!e.select}).then(function(){e.select=!e.select})}}}}]),app.directive("appTab",function(){return{restirct:"ECMA",templateUrl:"view/template/tab.html",replace:!0,scope:{lists:"="}}}),app.service("cache",["$cookies",function(t){this.put=function(e,o){t.put(e,o)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);