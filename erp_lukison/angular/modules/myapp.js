'use strict';
var myAppModule 	= angular.module('myAppModule',
								['ngRoute','angularSpinner','ui.bootstrap','ngAnimate','oc.lazyLoad','signature',
								 'ng-fusioncharts','naif.base64','monospaced.qrcode','ngCordova','ngMap','mm.acl']);
myAppModule.run(["$rootScope", "$location", function ($rootScope, $location) 
{
    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        // console.log(userInfo);
    });
   
    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        // console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) 
    {
        if (eventObj.authenticated === false) 
        {
            $location.path("/login");
        }
    });
}]);




