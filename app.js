var express 	= require('express');
var express 	= require('express')
	, exphbs	= require('express-handlebars')
  	, port      = 3000
  	, path      = require('path')
	, router 	= express.Router()
	, userRoutes = require('./routes/userRoutes.js')
	// Include all individual routes
	, dashRoute = require('./routes/dashRoute.js')
	, cfg = require('./config')
	, session = require('express-session')
	, request = require('request')
	, querystring = require('querystring')



var access_token = ''

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'auth-base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

/*
	Middlewares
*/

app.use(session({
	cookieName: 'session',
	secret: 'thisismysecret',
	resave: false,
	saveUninitialized: true
}))


app.get('/', function(req, res){
<<<<<<< HEAD

=======
	res.render('login')
	// var post_data = {
	// 	client_id: cfg.client_id,
	// 	client_secret: cfg.client_secret,
	// 	redirect_uri: cfg.redirect_uri,
	// 	grant_type: 'authorization_code',
	// 	code: req.query.code
	// }

	// var options = {
	// 	url: 'https://api.instagram.com/oauth/access_token',
	// 	form: post_data
	// }
	// // res.render('login')

	// request.post(options, function(error, response, body) {
	// 	var data = JSON.parse(body)
	// 	console.log(data)
	// 	req.session.access_token = data.access_token
	// 	res.redirect('/dashboard/dashboard')
	// })
})

app.get('/authorize', function(req, res) {
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
>>>>>>> 6d73348edc05b093e9ad44f1ea80037fb91ea730
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
		var data = JSON.parse(body)
		console.log(data)
		req.session.access_token = data.access_token
		res.redirect('/dashboard/dashboard')
	})
})



app.use('/users', userRoutes)
app.use('/dashboard', dashRoute)

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
