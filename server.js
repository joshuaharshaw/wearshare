var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var cloudinary = require('cloudinary');
var pool = require("./pg-connection-pool");
var formidable = require('formidable');

// cloudinary.config({
// 	cloud_name:"dr1gz6f3y",
// 	api_key:"647715557514671",
// 	api_secret:"gqj5eFiuKTQ-JkKJCB1UIUo5usI"
// });

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
	});
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

app.get('/users/:user_id/outfits', function(req,res){
	var sql ='SELECT * FROM outfits WHERE user_id=$1::int;';
	var values = [ req.params.user_id ];
	pool.query(sql, values).then(function(result){
		res.status(201).send(result.rows);
	}).catch(function(err){
		console.log(err);
		res.status(500);
		res.send("server error");
	})
});

app.get('/outfits/top', function(req,res){
	pool.query('SELECT * FROM public.outfits order by total_score desc limit 2').then(function(result){
		res.status(201).send(result.rows);
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
		+ 'VALUES ($1::int, $2::text, $3::text, $4::text, $5::text)';
	var values = [ req.params.user_id, req.body.image_path, req.body.article_type, req.body.article_desc, req.body.article_name ];
	pool.query(sql, values).then(function(result){
		res.status(201).send("Article Added!");
	}).catch(function(err){
		console.log(err);
		res.status(500).send("server error");
	})
});

app.post('/users/:user_id/outfits', function(req,res){
	var sql ='INSERT INTO outfits (user_id, top_id, bottom_id, shoe_id, outfit_name) '
		+ 'VALUES ($1::int, $2::int, $3::int, $4::int, $5::text)';
	var values = [ req.params.user_id, req.body.top_id, req.body.bottom_id, req.body.shoe_id, req.body.outfit_name ];
	pool.query(sql, values).then(function(result){
		res.status(201).send("Outfit Added!");
	}).catch(function(err){
		console.log(err);
		res.status(500).send("server error");
	})
});

app.post('/outfits/:outfit_id/:score', function(req,res){
	var sql ='UPDATE outfits SET total_votes = total_votes + 1, total_score = total_score + $2::int WHERE outfit_id=$1::int;'
	var values = [ req.params.outfit_id, req.params.score ];
	pool.query(sql, values).then(function(result){
		res.status(201).send("Rating");
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
// taskkill /f /im node.exe