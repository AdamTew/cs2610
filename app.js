var express 	  = require('express')
	, exphbs	    = require('express-handlebars')
  , port        = 3000
  , path        = require('path')
	, router 	    = express.Router()
	, userRoutes  = require('./routes/userRoutes.js')
	, cfg         = require('./config')
	, session     = require('express-session')
	, request     = require('request')
	, querystring = require('querystring')
	, bodyParser  = require('body-parser')
  , db          = require('./db')

var dburl = "mongodb://admin:JoeSmith1820!!@ds053784.mongolab.com:53784/heroku_k9643vx1"

var access_token = ''

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'auth-base'}))
app.set('view engine', 'handlebars')

/*
	Middlewares
*/

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
	cookieName: 'session',
	secret: 'thisismysecret',
	resave: false,
	saveUninitialized: true
}))

app.use(function (req, res, next) {
		if(req.originalUrl.substring(0,5) == '/auth' || req.originalUrl.substring(0,10) == '/authorize' || req.originalUrl == '/'){
			next()
		} else if(typeof req.session.access_token === 'undefined'){
			res.redirect('/')
		} else if(req.session.access_token) {
			var options = {
				url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.session.access_token
			}

			request(options, function(error, response, body){
				body = JSON.parse(body)
				if(body.meta.error_message) {res.redirect('/')}
				next();
			})
		} else {
			next()
		}
})

app.get('/', function(req, res){
		res.render('login', {
			layout: 'base'
		})
})

app.post('/authorize', function(req, res) {
	// if(req.query.error == 'access_denied'){
	// 	return res.redirect('/')
	// }

	var qs = {
		client_id: cfg.client_id,
		redirect_uri: cfg.redirect_uri,
		response_type: 'code'
	}

	var query = querystring.stringify(qs)

	var url = 'https://api.instagram.com/oauth/authorize/?' + query

	res.redirect(url)
})

app.get('/auth', function(req,res){
	var post_data = {
		client_id: cfg.client_id,
		client_secret: cfg.client_secret,
		redirect_uri: cfg.redirect_uri,
		grant_type: 'authorization_code',
		code: req.query.code
	}

	var options = {
		url: 'https://api.instagram.com/oauth/access_token',
		form: post_data
	}

	request.post(options, function(error, response, body) {
		body = JSON.parse(body)
		req.session.access_token = body.access_token
		req.session.userid = body.user.id
		res.redirect('/users/dashboard')
	})
})

app.get('/logout', function(req,res){
	req.session.destroy()
	res.redirect('/')
})

app.use('/users', userRoutes)

db.connect(dburl, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(port, function() {
      console.log('Server running at http://localhost:' + port + '/')
    })
  }
})
