'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/salesman',
	{
		templateUrl	: 'angular/partial/salesman/dashsalesman.html',
		controller 	: 'SalesmanController',
		resolve: 
		{
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
	});
    $routeProvider.when('/salesman/listbarangumum',
    {
        templateUrl : 'angular/partial/salesman/listbarangumum.html',
        controller  : 'SalesmanController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    $routeProvider.when('/salesman/listkategori',
    {
        templateUrl : 'angular/partial/salesman/listkategori.html',
        controller  : 'SalesmanController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/salesman/listsuplier',
    {
        templateUrl : 'angular/partial/salesman/listsuplier.html',
        controller  : 'SalesmanController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/salesman/listtipebarang',
    {
        templateUrl : 'angular/partial/salesman/listtipebarang.html',
        controller  : 'SalesmanController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/salesman/chart/esm/sales',
    {
        templateUrl : 'angular/partial/salesman/chartesmsales.html',
        controller  : 'SalesmanController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    
    $routeProvider.when('/salesman/chart/esm/warehouses',
    {
        templateUrl : 'angular/partial/salesman/chartesmwarehouses.html',
        controller  : 'SalesmanController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/salesman/chart/hrm/personalia',
    {
        templateUrl : 'angular/partial/salesman/charthrmpersonalia.html',
        controller  : 'SalesmanController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
}]);