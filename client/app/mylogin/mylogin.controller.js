'use strict';

angular.module('myproApp')
  .controller('MyloginCtrl', function ($scope, $http, MyAuth , $location) {
    $scope.mylogin = function(form1) {
      $scope.submitted = true;

      if(form1.$valid) {
        console.info($scope.user);
        MyAuth.mylogin({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then( function() {
            // Logged in, redirect to home
            //console.info("Fine: ");
            $location.path('/');
          })
          .catch( function(err) {
            $scope.errors.other = err.message;
          });
      }
    };


  });
