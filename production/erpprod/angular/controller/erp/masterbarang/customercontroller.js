myAppModule.controller("NewCustomerController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{

    $scope.userInfo = auth;

    apiService.listprovinsi()
    .then(function (result) 
    {
        $scope.provinsis = result.Provinsi;
    });

    apiService.listkabupaten()
    .then(function (result) 
    {
        $scope.kabupatens = result.Kabupaten;
    });
    $scope.provinsichange = function()
    {
        $scope.filterprovinsi = $scope.barangumum.provinsi;
    }
    
    $scope.submitForm = function(barangumum)
    {
        $scope.loading =true;
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }   
}]);

myAppModule.controller("ListCustomerController", ["$scope", "$location","$http", "authService", "auth","$window","$cordovaBarcodeScanner", "apiService",
function ($scope, $location, $http, authService, auth,$window,$cordovaBarcodeScanner,apiService) 
{  
    $scope.loading  = true;
    $scope.userInfo = auth;

    apiService.listcustomers()
    .then(function (result) 
    {
        $scope.customers = result.Customer;
        $scope.loading  = false;
    });


    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", "apiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,apiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    $http.get('')
    .success(function(data,status, headers, config) 
    {

        
    })

    .error(function (data, status, header, config) 
    {
           $location.path('/error/404');
    }).

    finally(function()
    {
        $scope.loading = false ;
    });

    
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("EditCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    $http.get('')
    .success(function(data,status, headers, config) 
    {
    
    })

    .error(function (data, status, header, config) 
    {
           $location.path('/error/404');
    }).

    finally(function()
    {
        $scope.loading = false ;
    });

    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("DeleteCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    // $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    
    alert($scope.iddistributor);
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);



