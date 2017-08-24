var app = angular.module("outfitApp");

app.controller("wardrobeCtrl", function ($scope, profileService, $q) {
	$scope.articles;
	$scope.article = {};
	$scope.avswitch = 1;
	$scope.outfit = {
		topArticle : null,
		bottomArticle : null,
		shoes : null
	};

	$scope.getArticles = function () {
		var promise = profileService.getArticles();

		promise.then(function (articles) {
			$scope.articles = articles;
			console.log($scope.articles);
		});
	};

	$scope.getArticles();

	$scope.postArticle = function () {
		var submitted = JSON.stringify($scope.article);
		console.log(submitted);
		profileService.postArticle(submitted);
	};
});

app.controller("outfitCtrl", function ($scope, profileService, $q) {
	$scope.outfits;
	$scope.outfit ={};
	$scope.articles;
	$scope.rating;

	$scope.getArticles = function () {
		var promise = profileService.getArticles();

		return promise;
	};

	$scope.getOutfits = function () {
		var promise = profileService.getOutfits();

		return promise;
	};

	$scope.select = function (article) {
		if (article.article_type === "top") {
			$scope.outfit.topArticle = article;
			console.log($scope.outfit.topArticle);
		} else if (article.article_type === "bottom") {
			$scope.outfit.bottomArticle = article;
			console.log($scope.outfit.bottomArticle);
		} else if (article.article_type === "shoes") {
			$scope.outfit.shoes = article;
			console.log($scope.outfit.shoes);
		}
	};

	$scope.postOutfit = function () {
		console.log($scope.outfit);
		var outfit = {
			"top_id":$scope.outfit.topArticle.article_id,
			"bottom_id":$scope.outfit.bottomArticle.article_id,
			"shoe_id":$scope.outfit.shoes.article_id
		};

		profileService.postOutfit(outfit);
	}

	$q.all([$scope.getOutfits(), $scope.getArticles()]).then(function (response) {
		var outfits = response[0];
		var articles = response[1];

		outfits.forEach(function (outfit) {
			outfit.top = articles.find(function (article) {
				return article.article_id === outfit.top_id;
			});

			outfit.bottom = articles.find(function (article) {
				return article.article_id === outfit.bottom_id;
			});

			outfit.shoe = articles.find(function (article) {
				return article.article_id === outfit.shoe_id;
			});
		});

		$scope.addRating = function () {
            console.log(this);
            var currentOutfit = this.outfit.outfit_id;
            var score = this.value;
            profileService.addRating(currentOutfit, score);
        }

		console.log(outfits);
		$scope.outfits = outfits;
	});
});

app.controller("homeCtrl", function ($scope, profileService, $routeParams, $q) {
	$scope.outfits;
	$scope.outfit ={};
	$scope.articles;
	$scope.rating;

	$scope.getArticles = function () {
		var promise = profileService.getArticles();

		return promise;
	};

	$scope.getOutfits = function () {
		var promise = profileService.getOutfits();

		return promise;
	};

	$scope.select = function (article) {
		if (article.article_type === "top") {
			$scope.outfit.topArticle = article;
			console.log($scope.outfit.topArticle);
		} else if (article.article_type === "bottom") {
			$scope.outfit.bottomArticle = article;
			console.log($scope.outfit.bottomArticle);
		} else if (article.article_type === "shoes") {
			$scope.outfit.shoes = article;
			console.log($scope.outfit.shoes);
		}
	};

	$scope.postOutfit = function () {
		console.log($scope.outfit);
		var outfit = {
			"top_id":$scope.outfit.topArticle.article_id,
			"bottom_id":$scope.outfit.bottomArticle.article_id,
			"shoe_id":$scope.outfit.shoes.article_id
		};

		profileService.postOutfit(outfit);
	}

	$q.all([$scope.getOutfits(), $scope.getArticles()]).then(function (response) {
		var outfits = response[0];
		var articles = response[1];

		outfits.forEach(function (outfit) {
			outfit.top = articles.find(function (article) {
				return article.article_id === outfit.top_id;
			});

			outfit.bottom = articles.find(function (article) {
				return article.article_id === outfit.bottom_id;
			});

			outfit.shoe = articles.find(function (article) {
				return article.article_id === outfit.shoe_id;
			});
		});

		$scope.addRating = function () {
            console.log(this);
            var currentOutfit = this.outfit.outfit_id;
            var score = this.value;
            profileService.addRating(currentOutfit, score);
        }

		console.log(outfits);
		$scope.outfits = outfits;
	});

	$scope.getUsers = function () {
		var users = profileService.getUsers();

		users.then(function (users) {
			$scope.users = users;
			console.log($scope.users);
		});
	};

	$scope.getUsers();
});
