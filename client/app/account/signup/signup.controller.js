'use strict';

angular.module('myproApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window,fileUpload) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
		
		var file = $scope.user.myFile;
		var uploadUrl = "/api/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl).success(function(data){
		file = data.fileName;

				Auth.createUser({
				  name: $scope.user.name,
				  email: $scope.user.email,
				  file: file,
				  password: $scope.user.password,
				  })
				.then( function(data) {
				  $location.path('/');
				})
				.catch( function(err) {
				  err = err.data;
				  $scope.errors = {};

				  // Update validity of form fields that match the mongoose errors
				  angular.forEach(err.errors, function(error, field) {
					form[field].$setValidity('mongoose', false);
					$scope.errors[field] = error.message;
				  });
				});
		
		});

      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
