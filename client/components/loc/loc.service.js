'use strict';

angular.module('myproApp')
  .factory('Loc', function ($resource) {
    return $resource('/api/locations/:id/:controller', {
        id: '@_id'
      },
      {
	  update: {
		method: 'PUT' // this method issues a PUT request
	  }
      });
  });
