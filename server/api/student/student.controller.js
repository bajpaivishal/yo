'use strict';
var _ = require('lodash');
var Student = require('./student.model');


/**
 * Get list of students
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Student.find({}, function (err, students) {
    if(err) return res.status(500).send(err);
    res.status(200).json(students);
  });
};

/**
 * Creates a new student
 */
exports.create = function (req, res, next) {
  var newStudent = new Student(req.body);
  newStudent.save(function(err, student) {
    res.json({ newStudent: newStudent });
  });
};



// Updates an existing student in the DB.
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



/**
 * Deletes a Student
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Student.findByIdAndRemove(req.params.id, function(err, student) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
