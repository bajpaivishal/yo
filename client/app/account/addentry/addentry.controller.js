'use strict';

var app  = angular.module('myproApp');
app.controller('addEntryCtrl', function ($scope,Entry) {
	
	$scope.entry = {};
	$scope.entries = Entry.query({});

	$scope.addentry = function(form) {
		//console.log($scope.entry);
        Entry.save($scope.entry,function(data) {
             $scope.entries.push(data.newentry);
			//console.log(data);
        });
    }
	
	$scope.removeEntry = function(id) {
		Entry.remove({ id: id });
		$scope.entries = $scope.entries.filter(function(elem){
			return elem._id != id;
		});
		
    }

});

app.filter('memberInc', function() {
	  return function(input) {
		//console.log(input);
		//return (Object.keys(input)).filter((elm)=>input[elm]).join();	
		var arr = Object.keys(input);
		arr.filter(function(ele){
			ele => input[ele];
		});
		return arr.join();
	  }
});


