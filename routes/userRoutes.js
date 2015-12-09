var express     = require('express')
  , router      = express.Router()
  , querystring = require('querystring')
  , request     = require('request')
  , config      = require('../config')
  , Users       = require('../models/users')

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
    Users.find(body.data.id, function(user){
      if(user){
        return res.render('profile', {
          title: 'Welcome | Profile',
          user: user,
        })
      }

      body.data.searches = new Array()
      Users.insert(body.data, function(result){
        if(result){
          return res.render('profile', {
            title: 'Welcome | Profile',
            user: body.data,
          })
        }
      })
    })
  })
})

router.post('/profile', function(req,res){
  body = req.body;
  console.log(JSON.stringify(body))
  Users.update(body, function(){
    res.redirect('/users/profile');
  })
})

router.get('/search', function(req,res){
  Users.find(req.session.userid, function(user){
    if(user){
      var savedsearches = user.searches;
      return res.render('search', {
        title: 'Welcome | Search',
        results : [],
        saved: savedsearches,
        query: ''
      })
    }
    res.render('search', {
      title: 'Welcome | Search',
      results : [],
      saved: [],
      query: ''
    })
  })
})

router.post('/search', function(req,res){
  var options = {
    url: 'https://api.instagram.com/v1/tags/'+ req.body.search +'/media/recent?access_token=' + req.session.access_token
  }
  request(options, function(error, response, body){
    body = JSON.parse(body)
    Users.find(req.session.userid, function(user){
      if(user){
        var savedsearches = user.searches;
        return res.render('search', {
          title: 'Welcome | Search',
          results : body.data,
          saved: savedsearches,
          query: req.body.search,
          helpers: {
            hasLiked: function(liked){
              if(liked){return 'icono-smile'}
              return 'icono-checkCircle'
            }
          }
        })
      }
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
})

router.post('/savesearch', function(req,res){
  Users.find(req.session.userid, function(user){
    if(user){
      user.searches.push(req.body.search)
      Users.update(user,function(){
        res.redirect('/users/search')
      })
    } else {
      res.redirect('/users/profile')
    }
  })
})

module.exports = router
