'use strict';
var _ = require('lodash');
var Entry = require('./entry.model');


/**
 * Get list of students
 * restriction: 'admin'
 */
 
exports.index = function(req, res) {
   Entry.find({}, function (err, Entry) {
    if(err) return res.status(500).send(err);
    res.status(200).json(Entry);
  }); 
};


exports.totalAmount = function(req, res) {
	Entry.aggregate(
		[
		   {$match : {}},{ $group : {_id:"$name",total:{$sum : "$price" },list:{$push : "$price" }} }
		],
        function (err, Entry) {
            if (err) return handleError(err);
			res.status(200).json(Entry);
        }
    );

};


/**
 * Creates a new student
 */
exports.create = function (req, res, next) {
	console.log(req.body.member);
	var d = new Date(req.body.date);
	var finaldate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
	
	var total = 0;
	if(req.body.member.vishal  == true){
		total = total + 1
	}
	if(req.body.member.mohsin  == true){
		total = total + 1
	}
	if(req.body.member.vishnu  == true){
		total = total + 1
	}
	if(req.body.member.aayush  == true){
		total = total + 1
	}	
	
	var vishalPrice = 0;
	var mohsinPrice = 0;
	var vishnuPrice = 0;
	var aayushPrice = 0;
	
	if(req.body.member.vishal  == true){
		vishalPrice = req.body.price / total;
	}
	if(req.body.member.mohsin  == true){
		mohsinPrice = req.body.price / total;
	}
	if(req.body.member.vishnu  == true){
		vishnuPrice = req.body.price / total;
	}
	if(req.body.member.aayush  == true){
		aayushPrice = req.body.price / total;
	}
	
	
	
	
	var newentry = new Entry({
		"name": req.body.name,
		"product": req.body.product,
		"price": req.body.price,
		"date": finaldate,
		"member": req.body.member,
		"memberPrice": {"aayush":aayushPrice,"vishnu":vishnuPrice,"mohsin":mohsinPrice,"vishal":vishalPrice}
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
