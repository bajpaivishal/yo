
'use strict';
var _ = require('lodash');
var Entry = require('./entry.model');
var User = require('../user/user.model');


/**
 * Get list of students
 * restriction: 'admin'
 */
 
exports.index = function(req, res) {
   Entry.find({}, function (err, Entry) {
    if(err) return res.status(500).send(err);
    res.status(200).json(Entry);
  }).sort({$natural:-1}); 
};


exports.totalAmount = function(req, res) {

	User.find({}, {name:1,_id:0}, function (err, users) {
		// combinations
		var letters = users;
		var combi = [];
		var temp= "";
		var letLen = Math.pow(2, letters.length);
		for (var i = 0; i < letLen ; i++){
			var innerTmp = [];
			for (var j=0;j<letters.length;j++) {
				if ((i & Math.pow(2,j))){
					if(1)		
					innerTmp.push(letters[j])
				}
			}
			if (innerTmp !== []) {
				if(innerTmp.length && innerTmp.length != 1 )
				combi.push(innerTmp);
			}
		}
		//console.log(combi);
		
		var response = {};
		combi.forEach((singleCombi)=>{
			//console.log(Object.keys(singleCombi));
			var memberMatch = {};
			var objkey = [];
			users.forEach((user)=>{
				memberMatch["member." + user.name] = false;
			});
			singleCombi.forEach((user)=>{
				memberMatch["member." + user.name] = true;
				objkey.push(user.name);
			});
			objkey = objkey.join();
			
			Entry.aggregate(
				[
				   {$match : memberMatch},{ $group : {_id:"$name",total:{$sum : "$price" },list:{$push : "$price" },member:{$addToSet : "$member" }} }
				],
				function (err, Entry) {
					if (err) return handleError(err);
					response[objkey] = Entry;
					//console.log(index,"====>>",Object.keys(response).length,combi.length)
					if(Object.keys(response).length == combi.length-1) {
						res.status(200).json(response);
					}				
				}
			);		
		});		
	});
};

/**
 * Creates a new student
 */
exports.create = function (req, res, next) {

	var d = new Date(req.body.date);
	var finaldate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
	
	var allUser = req.body.member;
	var fullPrice = req.body.price;
	var perHead = 0;	
	var selecteduserKeys = Object.keys(allUser).filter((ele)=>allUser[ele]);
	var each = selecteduserKeys.length;	
	perHead = fullPrice / each;
	var memberPriceKeys = Object.keys(req.body.member);
	
	var memberPrice = {};
	memberPriceKeys.forEach((member)=>{
		return memberPrice[member] = perHead;
	});
	//console.log(memberPrice);

	var newentry = new Entry({
		"name": req.body.name,
		"product": req.body.product,
		"price": req.body.price,
		"date": finaldate,
		"member": req.body.member,
		"perhead": perHead,
		"memberPrice": memberPrice
	});

	newentry.save(function(err, Entry) {
		res.json({ newentry: newentry });
	});

};




// Updates an existing student in the DB.
/*
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Student.findById(req.params.id, function (err, student) {
    if (err) { return handleError(res, err); }
    if(!student) { return res.status(404).send('Not Found'); }
    var updated = _.merge(student, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(student);
    });
  });
};
*/



/**
 * Deletes a Student
 * restriction: 'admin'
 */
 
exports.destroy = function(req, res) {
  Entry.findByIdAndRemove(req.params.id, function(err, Entry) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};


/**
 * Authentication callback
 */
 /*
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};*/
