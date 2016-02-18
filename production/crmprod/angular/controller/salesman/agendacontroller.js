'use strict';
myAppModule.controller("AgendaController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService",
function ($scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService) 
{
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });
    
    $scope.loading  = true;
    var idsalesman = auth.id;
    var tanggal = "2016-02-12";
    apiService.listagenda(idsalesman,tanggal)
    .then(function (result) 
    {
        var idgroupcustomer;
        angular.forEach(result.Agenda, function(value, key) 
        {
          idgroupcustomer =value.SCDL_GROUP;
        });

        singleapiService.singlelistgroupcustomer(idgroupcustomer)
        .then(function (result) 
        {
            console.log(result);
            $scope.customers = result.Customer;
            $scope.loading  = false;
        });
    });

}]);

myAppModule.controller("MapAgendaController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService",
function ($scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService) 
{
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });

    $scope.loading  = true;
    var idsalesman = auth.id;
    var tanggal = "2016-02-12";
    apiService.listagenda(idsalesman,tanggal)
    .then(function (result) 
    {
        var idgroupcustomer;
        angular.forEach(result.Agenda, function(value, key) 
        {
          idgroupcustomer =value.SCDL_GROUP;
        });

        singleapiService.singlelistgroupcustomer(idgroupcustomer)
        .then(function (result) 
        {
            console.log(result);
            $scope.customers = result.Customer;
            $scope.loading  = false;
        });
    });

}]);