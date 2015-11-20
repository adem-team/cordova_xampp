var demoApp = angular.module('demoApp',['ngRoute']);

    demoApp.config(function($routeProvider) 
    {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'page/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'page/about.html',
                controller  : 'aboutController'
            })

           // route for the contact page
            .when('/contact', {
                templateUrl : 'page/contact.html',
                controller  : 'contactController'
            });
    });

    demoApp.controller('mainController', function($scope) 
    {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    demoApp.controller('aboutController', function($scope) 
    {
        $scope.message = 'Look! I am an about page.';
    });

    demoApp.controller('contactController', function($scope) 
    {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });


