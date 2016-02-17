'use strict';
myAppModule.controller("HomeController", ["$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService","ngToast", 
function ($scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService,ngToast) 
{
    $scope.zoomvalue = 17;
    $scope.loading  = true;
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });

    apiService.listcustomer()
    .then(function (result) 
    {
        $scope.customers = result.Customer;
        $scope.loading  = false;  
    });


    $scope.viscustomer = function()
    {
        $location.path('/visit');
    }

    $scope.groupcustomer = function()
    {
        $location.path('/groupcustomer');
    }
    $scope.reportase = function()
    {
        $location.path('/report');
    }

    $scope.profile = function()
    {
        $location.path('/profile');
    }

    $scope.mapcustomer = function()
    {
        $location.path('/mapcustomer');
    }
    $scope.agenda = function()
    {
        $location.path('/agenda');
    }

    $scope.userInfo = auth;

	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
  
}]);



