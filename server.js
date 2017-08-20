var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.use(express.static('public'));

var pool = new pg.Pool({
	user:'postgres',
	password: 'gvalley',
	host: 'localhost',
	port: 5433,
	database: 'postgres',
	ssl: false
});


var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Server is now running on ' + port);
});