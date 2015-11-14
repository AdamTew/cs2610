var express     = require('express')
  , router      = express.Router()
  , querystring = require('querystring')
  , request     = require('request')
  , config      = require('../config')

router.get('/', function(req,res){
  res.redirect('/users/dashboard')
})

router.get('/dashboard', function(req,res){
  var qs = {
    access_token: req.session.access_token,
    count: config.feed_count
  }
  var query = querystring.stringify(qs)
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?' + query
  }
  request(options, function(error, response, body){
    if(response.statusCode == "404" || response.statusCode == "400"){
      res.redirect('../')
    } else {
      body = JSON.parse(body)
      res.render('dashboard', {
          title: "Welcome | Dashboard",
          feedlist: body.data
      })
    }
  })


})

router.get('/profile',function(req,res){
  var options = {
    url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.session.access_token
  }

  request(options, function(error, response, body){
    body = JSON.parse(body)
    res.render('profile', {
      title: 'Welcome | Profile',
      user: body.data,
    })
  })
})

router.get('/search', function(req,res){
  res.render('search', {
    title: 'Welcome | Search',
    results : [],
    saved: [],
    query: ''
  })
})

router.post('/search', function(req,res){
  var options = {
    url: 'https://api.instagram.com/v1/tags/'+ req.body.search +'/media/recent?access_token=' + req.session.access_token
  }

  request(options, function(error, response, body){
    body = JSON.parse(body)
    res.render('search',{
      title: 'Welcome | Search',
      results: body.data,
      saved: [],
      query: req.body.search,
      helpers: {
        hasLiked: function(liked){
          if(liked){return 'icono-smile'}
          return 'icono-checkCircle'
        }
      }
    })
  })
})

module.exports = router
