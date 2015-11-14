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
    console.log("req.body.search " + req.body.search)
    var options = {
      url: 'https://api.instagram.com/v1/tags/'+ req.body.search +'/media/recent?access_token=' + req.session.access_token
    }

    request(options, function(error, response, body){

      console.log('body ' +body)
      body = JSON.parse(body)
      var data = body.data
      console.log('data ' + data)
      res.render('search',{
        results: data,
        saved: []
      })
    })
  })

  module.exports = router
