'use strict';

angular.module('myproApp')
  .factory('MyAuth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {

      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      mylogin: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        console.info(user);
        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
            console.info(data);
          $cookieStore.put('token', data.token);
          currentUser = User.get();
            console.info(data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
            console.info(err);
         this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },


      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },


      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
