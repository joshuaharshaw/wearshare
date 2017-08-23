var app = angular.module("outfitApp");

app.controller("wardrobeCtrl", function ($scope, profileService) {
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

app.controller("outfitCtrl", function ($scope, profileService) {
	$scope.outfits;
	$scope.outfit ={};
	$scope.articles;

	$scope.getArticles = function () {
		var promise = profileService.getArticles();

		promise.then(function (articles) {
			$scope.articles = articles;
			console.log($scope.articles);
		});
	};

	$scope.getOutfits = function () {
		var promise = profileService.getOutfits();

		promise.then(function (outfits) {
			$scope.outfits = outfits;
			console.log($scope.outfits);
		});

		$scope.findArticles();
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

	$scope.findArticles() {

	};

	$scope.getOutfits();
	$scope.getArticles();
});