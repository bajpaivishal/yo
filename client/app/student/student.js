'use strict';

angular.module('myproApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student', {
        url: '/student',
        templateUrl: 'app/student/student.html',
        controller: 'StudentCtrl'
      });
  });