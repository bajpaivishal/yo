
var app  = angular.module('myproApp');
app.controller('addEntryCtrl', function ($scope,Entry,User) {

var letters = ["vishnu", "aayush", "vishal" , "mohsin"];
var combi = [];
var temp= "";
var letLen = Math.pow(2, letters.length);

for (var i = 0; i < letLen ; i++){
    innerTmp = [];
    for (var j=0;j<letters.length;j++) {
        if ((i & Math.pow(2,j))){
			if(1)		
            innerTmp.push(letters[j])
			console.log("====")
        }
    }
    if (innerTmp !== []) {
		if(innerTmp.length != 1 && innerTmp.length != letters.length )
        combi.push(innerTmp);
    }
}
console.log(combi.join("\n"));


	// User
	$scope.entry = {};
	$scope.users = User.query({});
	$scope.entry = {};
	$scope.entries = Entry.query({});

	$scope.addentry = function(form) {
		//console.log($scope.entry);
        Entry.save($scope.entry,function(data) {
             $scope.entries.push(data.newentry);
        });
    }
	
	$scope.removeEntry = function(id) {
		Entry.remove({ id: id });
		$scope.entries = $scope.entries.filter(function(elem){
			return elem._id != id;
		})
    }
	
	
	$scope.totalAmount = Entry.total();
	console.log($scope.totalAmount);


	
	
	$scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
		$scope.entry.member = {};
        angular.forEach($scope.users, function (item) {			
            $scope.entry.member[item.name] = $scope.selectedAll;
		   //console.log(item);
        });
    };

});

app.filter('memberInc', function() {
	  return function(input) {
		//console.log(input);
		return (Object.keys(input)).filter((elm)=>input[elm]).join();	
		// var arr = Object.keys(input);
		// arr.filter((ele)=>input[ele]);
		// return arr.join();
	  }
});

