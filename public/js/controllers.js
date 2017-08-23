var app = angular.module("outfitApp");

app.controller("wardrobeCtrl", function ($scope, profileService) {
	$scope.articles;
	$scope.article = {};
	$scope.avswitch = 1;

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

	$scope.getOutfits = function () {
		var promise = profileService.getOutfits();

		promise.then(function (outfits) {
			$scope.outfits = outfits;
		});
	};

	$scope.getOutfits();
});