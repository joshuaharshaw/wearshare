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
	password: 'sqlbeast',
	host: 'localhost',
	port: 5432,
	database: 'postgres',
	ssl: false
});


// app.get('/users', function(req,res){
// 	pool.query('SELECT * FROM users').then(function(result){
// 		res.send(result.rows);
// 	}).catch(function(err){
// 		console.log(err);
// 		res.status(500);
// 		res.send("server error");
// 	})
// });

// app.get('/users/:id', function(req,res){
// 	var sql ='SELECT * FROM users WHERE id=$1::int;' 
// 	var values = [ req.params.id ];
// 	pool.query(sql, values).then(function(result){
// 		res.status(201).send("Sent");
// 	}).catch(function(err){
// 		console.log(err);
// 		res.status(500);
// 		res.send("server error");
// 	})
// });

// app.get('/users/:id/items', function(req,res){
// 	var sql ='SELECT * FROM photos WHERE id=$1::int;' 
// 	var values = [ req.params.id ];
// 	pool.query(sql, values).then(function(result){
// 		res.status(201).send("Sent");
// 	}).catch(function(err){
// 		console.log(err);
// 		res.status(500);
// 		res.send("server error");
// 	})
// });

// app.post('/users', function(req,res){
// 	var sql ='INSERT INTO users (username, password) ' 
// 		+ 'VALUES ($1::text, $2::text)';
// 	var values = [ req.body.username, req.body.password ];
// 	pool.query(sql, values).then(function(result){
// 		res.status(201).send("Added");
// 	}).catch(function(err){
// 		console.log(err);
// 		res.status(500);
// 		res.send("server error");
// 	})
// });


// app.post('/users/:id/item', function(req,res){
// 	var sql ='INSERT INTO items (userid, path) ' 
// 		+ 'VALUES ($1::text, $2::text)';
// 	var values = [ req.params.userid, req.body.path ];
// 	pool.query(sql, values).then(function(result){
// 		res.status(201).send("Added Item");
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

