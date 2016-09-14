'use strict';

angular.module('myproApp')
  .factory('Std', function ($resource) {
    return $resource('/api/students/:id/:controller', {
        id: '@_id'
      },
      {
	  update: {
		method: 'PUT' // this method issues a PUT request
	  }
      });
  });
