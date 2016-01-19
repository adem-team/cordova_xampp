'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/erp/widget/pilotproject/departmentpilotschedule',
	{
		templateUrl	: 'angular/partial/erp/widget/pilotproject/departmentpilotschedule.html',
		controller 	: 'DepartmentPilotScheduleController',
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
    
    $routeProvider.when('/erp/widget/pilotproject/employeepilotschedule',
    {
        templateUrl : 'angular/partial/erp/widget/pilotproject/employeepilotschedule.html',
        controller  : 'EmployeePilotScheduleController',
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
