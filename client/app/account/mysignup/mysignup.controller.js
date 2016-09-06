'use strict';

angular.module('myproApp')
  .controller('MySignupCtrl', function ($scope, Auth, $location, $window,fileUpload) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      console.info(form);
      if(form.$valid) {
        var file = $scope.myFile;
        console.log('file is ',file );
        //console.dir(file);
        var uploadUrl = "/api/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);

        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
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
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  })
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files);
            //console.info("Applly: ",element[0].files);
          });
        });
      }
    };
  }])

. service('fileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    for(var key in file)
    fd.append('file', file[key]);
    console.info(fd);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .success(function(){
      })
      .error(function(){
      });
  }
}]);

