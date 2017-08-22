var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var cloudinary = require('cloudinary');
var pool = require("./pg-connection-pool");

cloudinary.config({
	cloud_name:"dr1gz6f3y",
	api_key:"647715557514671",
	api_secret:"gqj5eFiuKTQ-JkKJCB1UIUo5usI"
});

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/users', function(req,res){
	pool.query('SELECT * FROM users').then(function(result){
		res.send(result.rows);
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.send("server error");
	})
});

app.get('/users/:user_id', function(req,res){
	var sql ='SELECT * FROM users WHERE user_id=$1::int;' 
	var values = [ req.params.user_id ];
	pool.query(sql, values).then(function(result){
		res.status(201).send(result.rows);
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.send("server error");
	})
});

app.get('users/outfits', function(req,res){
	pool.query('SELECT * FROM outfits').then(function(result){
		res.send(result.rows);
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.send("server error");
	})
});

app.get('/users/:user_id/articles', function(req,res){
	var sql ='SELECT * FROM articles WHERE user_id=$1::int;'; 
	var values = [ req.params.user_id ];
	pool.query(sql, values).then(function(result){
		res.status(201).send(result.rows);
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.send("server error");
	})
});

app.post('/users', function(req,res){
	var sql ='INSERT INTO users (user_name, password) ' 
		+ 'VALUES ($1::text, $2::text)';
	var values = [ req.body.user_name, req.body.password ];
	pool.query(sql, values).then(function(result){
		res.status(201).send("Added");
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.send("server error");
	})
});


app.post('/users/:user_id/articles', function(req, res){
	var sql ='INSERT INTO articles (user_id, image_path, article_type, article_desc, article_name) ' 
		+ 'VALUES ($1::int, $2::text, $3::text, $4::text, $5::text, $6::text)';
	var values = [ req.params.user_id, req.body.image_path, req.body.article_type, req.body.article_desc, req.body.article_name ];
	pool.query(sql, values).then(function(result){
		res.status(201).send("result.rows");
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.send("server error");
	})
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Server is now running on ' + port);
});

// somewhat1255

