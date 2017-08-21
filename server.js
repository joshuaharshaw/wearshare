var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name:"dr1gz6f3y",
	api_key:"647715557514671",
	api_secret:"gqj5eFiuKTQ-JkKJCB1UIUo5usI"
});

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


// app.get('/api/:userid', function(req,res){
// 	var sql ='SELECT * FROM photos WHERE userid=$1::int;' 
// 	var values = [ req.params.userid ];
// 	pool.query(sql, values).then(function(result){
// 		res.status(201).send("Sent");
// 	}).catch(function(err){
// 		console.log(err);
// 		res.status(500);
// 		res.send("server error");
// 	})
// });


var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Server is now running on ' + port);
});

