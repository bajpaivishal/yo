'use strict';

angular.module('myproApp')
  .controller('StudentCtrl', function ($scope, Std) {
	$scope.students = [];
	$scope.students = Std.query({});
	
	
    $scope.addStudent = function(form1) {
    console.info(form1,$scope.student);
     console.info($scope.student);
      if(!$scope.student.updateId){
        Std.save($scope.student,function(data) {
            //console.info(data);
            $scope.students.push(data);
           // $scope.student = {};
          });
       }else{
		  Std.update({ id:$scope.student.updateId }, $scope.student);
		   angular.forEach($scope.students, function(u, i) {
				if (u._id === $scope.student.updateId) {
				  u.country = $scope.student.country;
				  u.city = $scope.student.city;
				  u.code = $scope.student.code;
				}
			  });
		
	   }
    };
	
	
	$scope.delete = function(student) {
    Std.remove({ id: student._id });
      angular.forEach($scope.students, function(u, i) {
        if (u === student) {
          $scope.students.splice(i, 1);
        }
      });
    };
	
	
	$scope.edit = function(student) {
		$scope.student = {};
		$scope.student.country = student.country;
		$scope.student.city = student.city;
		$scope.student.code = student.code;
		$scope.student.updateId = student._id;
	};
	
	$scope.addNewStd = function() {
      $scope.student={};
    };
	
	
  });
