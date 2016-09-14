'use strict';

angular.module('myproApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mylogin', {
        url: '/mylogin',
        templateUrl: 'app/mylogin/mylogin.html',
        controller: 'MyloginCtrl'
      });
  });
