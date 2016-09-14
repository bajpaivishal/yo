'use strict';

angular.module('myproApp')
  .controller('vsLoginCtrl', function ($scope, $http, VSAuth , $location) {
    $scope.vslogin = function(form2) {
      $scope.submitted = true;

      if(form2.$valid) {
        VSAuth.vsloginser({
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
