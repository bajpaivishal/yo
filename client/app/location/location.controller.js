'use strict';

angular.module('myproApp')
  .controller('LocationCtrl', function ($scope,Loc) {

    $scope.locations = Loc.query({});
    $scope.location = {};

    $scope.delete = function(location) {
      Loc.remove({ id: location._id });
      angular.forEach($scope.locations, function(u, i) {
        if (u === location) {
          $scope.locations.splice(i, 1);
        }
      });
    };

    $scope.addLoc = function(form) {
      //console.info(form);
      //console.info($scope.location);
      if(!$scope.location.updateId){
        Loc.save($scope.location,
          function(data) {
            //console.info(data);
            $scope.locations.push(data);
            $scope.location = {};
          });
       }else{

	   Loc.update({ id:$scope.location.updateId }, $scope.location);
	   angular.forEach($scope.locations, function(u, i) {
            if (u._id === $scope.location.updateId) {
              u.country = $scope.location.country;
              u.city = $scope.location.city;
              u.code = $scope.location.code;
            }
          });
		  
	   // console.log($scope.location);
	   
       /*  Loc.get({ id: $scope.location.updateId },function(data){
          var oldLoc = {};
          oldLoc = Object.create(data);

          data.country = $scope.location.country;
          data.city = $scope.location.city;
          data.code = $scope.location.code;
          data.$update();
         // console.info("=====",form.location);

          angular.forEach($scope.locations, function(u, i) {

            if (u._id === oldLoc._id) {
              u.country = oldLoc.country;
              u.city = oldLoc.city;
              u.code = oldLoc.code;
            }
          });
        }); */
      }
      };


    $scope.edit = function(location) {
      $scope.location.country = location.country;
      $scope.location.city = location.city;
      $scope.location.code = location.code;
      $scope.location.updateId = location._id;
      // console.info(location);
      // console.info($scope.location);
      //$scope.location = {};

      /*Loc.save($scope.location,
        function(data) {
          console.info(data);
          $scope.locations.push(data);
          $scope.location = {};
        });*/
    };

    $scope.addNewLoc = function() {
      $scope.location={};
    };

  });
