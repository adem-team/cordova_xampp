salesman.controller("HomeController", function($scope,$http) 
{


});

salesman.controller("TipsController", function($scope,$http) 
{

});

salesman.controller("SettingController", function($scope,$http) 
{

});


salesman.controller("TipsController", function($scope,$http) 
{

});

salesman.controller("FaqController", function($scope,$http) 
{
	$http.get('http://localhost/sym/ecommerce/web/app_dev.php/api/listbank')
        .success(function(data,status, headers, config) 
        {
            $scope.banks = data.banklist ;
        })

        .error(function (data, status, header, config) 
        {
                
        });
});

