
var salesman = angular.module("sampleApp", ['ngRoute']);

salesman.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/salesman', {
                templateUrl: 'asset/partial/salesman/home.html',
                controller: 'HomeController'
            }).
            when('/salesman/newcustomer', {
                templateUrl: 'asset/partial/salesman/home/newcustomer.html',
                controller: 'HomeController'
            }).
            when('/salesman/sellingoutmaintain', {
                templateUrl: 'asset/partial/salesman/home/sellingoutmaintain.html',
                controller: 'HomeController'
            }).
            when('/salesman/stockmaintain', {
                templateUrl: 'asset/partial/salesman/home/stockmaintain.html',
                controller: 'HomeController'
            }).
            when('/salesman/salespromotionmaintain', {
                templateUrl: 'asset/partial/salesman/home/salespromotionmaintain.html',
                controller: 'HomeController'
            }).
            when('/salesman/jadwalkunjungan', {
                templateUrl: 'asset/partial/salesman/home/jadwalkunjungan.html',
                controller: 'HomeController'
            }).
            when('/salesman/petacustomer', {
                templateUrl: 'asset/partial/salesman/home/petacustomer.html',
                controller: 'HomeController'
            }).
            when('/salesman/absensi', {
                templateUrl: 'asset/partial/salesman/home/absensi.html',
                controller: 'HomeController'
            }).
            when('/salesman/profile', {
                templateUrl: 'asset/partial/salesman/home/profile.html',
                controller: 'HomeController'
            }).
            when('/salesman/dailysellingout', {
                templateUrl: 'asset/partial/salesman/home/dailysellingout.html',
                controller: 'HomeController'
            }).
            when('/salesman/dailystockharian', {
                templateUrl: 'asset/partial/salesman/home/dailystockharian.html',
                controller: 'HomeController'
            }).
            when('/salesman/monthlysellingout', {
                templateUrl: 'asset/partial/salesman/home/monthlysellingout.html',
                controller: 'HomeController'
            }).
            when('/salesman/monthlystockharian', {
                templateUrl: 'asset/partial/salesman/home/monthlystockharian.html',
                controller: 'HomeController'
            }).

            when('/salesman/chatting', {
                templateUrl: 'asset/partial/salesman/chatting.html',
                controller: 'ChattingController'
            }).
            when('/salesman/faq', {
                templateUrl: 'asset/partial/salesman/faq.html',
                controller: 'FaqController'
            }).
            when('/salesman/tips', {
                templateUrl: 'asset/partial/salesman/tips.html',
                controller: 'TipsController'
            }).

            otherwise({
                redirectTo: '/salesman/'
            });
    }]);

