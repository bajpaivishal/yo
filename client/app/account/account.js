'use strict';

angular.module('myproApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
	  .state('myprofile', {
        url: '/myprofile',
        templateUrl: 'app/account/myprofile/myprofile.html',
        controller: 'myProfileCtrl'
      })
	  .state('addentry', {
        url: '/addentry',
        templateUrl: 'app/account/addentry/addentry.html',
        controller: 'addEntryCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
