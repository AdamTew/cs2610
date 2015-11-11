var express = require('express')
  , router = express.Router()
  , results = require('../results.json');

  router.get('/', function(req,res){
    res.render('dashboard', {
      title: "Welcome | Login"
    })
  })

  router.get('/dashboard', function(req,res){
    res.render('dashboard', {
      title: "Welcome | Login"
    })
  })

  router.get('/search', function(req,res){
    res.render('search', {
      results : results,
      saved: ['awesome', 'spartancoding', 'nodejs'],
      layout: "auth-base.handlebars"
    })
  })

  module.exports = router
