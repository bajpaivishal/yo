
var app  = angular.module('myproApp');
app.controller('addEntryCtrl', function ($scope,Entry,User) {

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
	
	//$scope.totalAmount = Entry.total();
	var allPayDetails = [];
	Entry.total().$promise.then((data)=>{	
		Object.keys(data).forEach((element)=>{
			singleCombi = data[element];
			///Start///Create Detaul Combi //////////////////
			var members = singleCombi[0] && Object.keys(singleCombi[0].member[0]).filter((member)=>{
				return singleCombi[0].member[0][member];
			});
			singleCombi[0] && singleCombi.forEach((entry,i)=>{
				singleCombi[0] && delete members[members.indexOf(singleCombi[i]._id)]
			})

			singleCombi[0] && members.forEach((member)=>{
				var defaultEntryOfCombi={};
				defaultEntryOfCombi._id = member;
				defaultEntryOfCombi.total = 0;
				defaultEntryOfCombi.member = member;
					data[element].push(defaultEntryOfCombi)	
			})
			
			singleCombi = data[element];
			///End///Create Detaul Combi //////////////////
			
			var payMembers = [];
			singleCombi.length && singleCombi.forEach((entry)=>{
				var payDetail = {};
				var members = Object.keys(entry.member[0]).filter((member)=>{
					return (entry.member[0][member]);
				});
				members = members.length;
				var memberShouldGive = entry.total/members;
				payDetail.member = entry._id;
				payDetail.howWillGive = entry.member[0];
				payDetail.total = entry.total;
				payDetail.members = members;
				payDetail.perHead = memberShouldGive;
				payMembers.push(payDetail);
			});
			var eachTotal = 0;
			var memberTotal = 0;
			var eachMember = [];
			var eachMember = data[element];
			allPayDetails.push(payMembers);
		})	
		allPayDetails.forEach((singleCombi,singleCombiIndex)=>{
			var combiTotal = 0;
			var combiperHead = 0;
			var combiMembers = 0;
		singleCombi.forEach((entry)=>{
			combiTotal += entry.total;
		})
		combiMembers = singleCombi[0] && singleCombi[0].members
		combiperHead = combiTotal/combiMembers;
		
		newSingleCombi = singleCombi.map((entry,i)=>{
			entry.combiperHead = combiperHead;
			entry.combiTotal = combiTotal;
			entry.memberWillGet = entry.total-combiperHead;
			return entry;
		})
		allPayDetails[singleCombiIndex] = newSingleCombi;
			// console.log(combiperHead,combiTotal)
		})
		
		
		console.log(allPayDetails)
		var payment = {};
		$scope.users.forEach((member)=>{
			var member = member.name;
			payment[member] = {};
			payment[member].list = [];
			var total = 0;
				allPayDetails.forEach((singleCombi)=>{
					
					singleCombi.forEach((entry)=>{
						if(entry.member == member){
							payment[member].list.push(entry.memberWillGet);
							total += entry.memberWillGet;
						}
					})
				})
				payment[member].total = total;
			});
			console.log(payment)
			$scope.finalPay = [];
			Object.keys(payment).forEach((key)=>{
				$scope.finalPay.push({name:key,amount:payment[key].total});
			})
		});

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

