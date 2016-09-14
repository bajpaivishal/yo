'use strict';

angular.module('myproApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
	  .state('vslogin', {
        url: '/vslogin',
        templateUrl: 'app/account/vslogin/vslogin.html',
        controller: 'vsLoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('mysignup', {
        url: '/mysignup',
        templateUrl: 'app/account/mysignup/mysignup.html',
        controller: 'MySignupCtrl'
      })
	  .state('vssignup', {
        url: '/vssignup',
        templateUrl: 'app/account/vssignup/vssignup.html',
        controller: 'vsSignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
