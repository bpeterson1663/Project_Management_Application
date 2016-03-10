var express = require('express');
var router = express.Router();
var $ = require('jQuery');
var fullName = require('../modules/ranName.js');
var skills = require('../modules/ranSkill.js');
var scrum = require('../modules/ranScrum.js');

var path = require('path');

router.get("/staff", function(req, res){
  var allStaff = {};
  allStaff.name = fullName();
  allStaff.skill = skills();
  allStaff.sprint = scrum();
  res.send(allStaff);

});

router.get("/*", function(req, res) {
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '../public', file));
  console.log("hello");
});

module.exports = router;
