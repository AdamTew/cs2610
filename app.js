var express 	= require('express');
var express 	= require('express')
	, exphbs	= require('express-handlebars')
  	, port      = 3000
  	, path      = require('path')
	, router 	= express.Router()
	, userRoutes = require('./routes/userRoutes.js')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes)

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')