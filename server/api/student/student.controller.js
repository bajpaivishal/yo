'use strict';

var Student = require('./student.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of students
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Student.find({}, '-salt -hashedPassword', function (err, students) {
    if(err) return res.status(500).send(err);
    res.status(200).json(students);
  });
};

/**
 * Creates a new student
 */
exports.create = function (req, res, next) {
  var newStudent = new Student(req.body);
  newStudent.provider = 'local';
  newStudent.role = 'student';
  newStudent.save(function(err, student) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: Student._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single Student
 */
exports.show = function (req, res, next) {
  var studentId = req.params.id;

  Student.findById(studentId, function (err, student) {
    if (err) return next(err);
    if (!student) return res.status(401).send('Unauthorized');
    res.json(student.profile);
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
 * Change a students password
 */
exports.changePassword = function(req, res, next) {
  var studentId = req.student._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  Student.findById(studentId, function (err, student) {
    if(student.authenticate(oldPass)) {
      student.password = newPass;
      student.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var studentId = req.student._id;
  console.log(req.student._id);
  User.findOne({
    _id: studentId
  }, '-salt -hashedPassword', function(err, student) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!student) return res.status(401).send('Unauthorized');
    res.json(student);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
