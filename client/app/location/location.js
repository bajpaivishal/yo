'use strict';

angular.module('myproApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'LocationCtrl'
      });
  });