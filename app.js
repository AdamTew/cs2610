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



var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'auth-base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){

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
	// res.render('login')

	request.post(options, function(error, response, body) {
		var data = JSON.parse(body)
		console.log(data)
		req.session.access_token = data.access_token
		res.redirect('/dashboard')
	})

})
app.use('/users', userRoutes)

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
