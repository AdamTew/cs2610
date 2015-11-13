var express = require('express')
  , router = express.Router()
  , querystring = require('querystring')
  , request = require('request')

router.get('/dashboard', function(req,res){
  var qs = {
    access_token: req.session.access_token
  }
  var query = querystring.stringify(qs)
  var url = 'https://api.instagram.com/v1/users/self/feed?'+ query

  var options = {
    url: url
  }
  request(options, function(error, response, body){
    res.render('dashboard', {
        title: "Welcome | Login",
        feedlist: body.data
    })
  })


})

  module.exports = router
