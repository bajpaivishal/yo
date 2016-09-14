'use strict';

angular.module('myproApp')
  .controller('StudentCtrl', function ($scope, Std) {
	//  $scope.students = [];
	//  $scope.student = {};
	  $scope.student = Std.query({});
	//  console.log($scope.student);
	    $scope.addStudent = function(form1) {
     // console.info(form1,$scope.student);
     console.info($scope.student);
      if(1){
        Std.save($scope.student,function(data) {
            //console.info(data);
            $scope.students.push(data);
           // $scope.student = {};
          });
       }
      };
  });
