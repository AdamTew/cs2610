var express = require('express')
  , router = express.Router()
  , results = require('../results.json');

router.get('/dashboard', function(req,res){
	res.render('dashboard', {
  		title: "Welcome | Login"
	})
})

  module.exports = router
