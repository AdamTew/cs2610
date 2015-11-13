var express = require('express')
  , router = express.Router()
  , results = require('../results.json')
  , request = require('request')

  router.get('/', function(req,res){
    res.render('dashboard', {
      title: "Welcome | Login"
    })
  })

  router.get('/search', function(req,res){
    var ACCESS_TOKEN = "";

    res.render('search', {
      results : [],
      saved: [],
      layout: "auth-base.handlebars"
    })
  })

  router.post('/search', function(req,res){
    var ACCESS_TOKEN = "2236396886.1677ed0.54863aa09137410c8896670da0b347ed"
    var options = {
      url: 'https://api.instagram.com/v1/tags/'+ req.search +'/media/recent?access_token=' + ACCESS_TOKEN
    }

    request(options, function(error, response, body){
      var data = body.data
      console.log("body.data " + body.data)
      res.render('search',{
        results: data,
        saved: []
      })
    })
  })

  module.exports = router
