'use strict';

angular.module('myproApp')
  .controller('myProfileCtrl', function ($scope,$http,User,Entry) {  
	$scope.current = User.get();
	
	$scope.entry = {};
	$scope.entries = Entry.query({});
	

	$scope.totalAmount = 	Entry.total();
	Entry.total().$promise.then(function(data) {
		$scope.sum = 0;
		$scope.totalmem = 0;
		$scope.percandidate = 0;		
		
		data.forEach(function(element){
			$scope.sum += element.total;
			$scope.totalmem++;
		})
		
		$scope.percandidate = $scope.sum / 4;		
	});;

	
	

	
 });
