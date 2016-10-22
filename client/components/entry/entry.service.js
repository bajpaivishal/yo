'use strict';

angular.module('myproApp')
  .factory('Entry', function ($resource) {  
	 
    return $resource('/api/entry/:id/:controller/:listCtrl', {
        id: '@_id'
      },
      {
	  update: {
		method: 'PUT' // this method issues a PUT request
	  },
	  total: {
			method: 'GET',
			params: {
				listCtrl: 'all'
			}
			//isArray: true,
		}
      });
  });
