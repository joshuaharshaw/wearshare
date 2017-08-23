var app = angular.module("outfitApp");

app.controller("wardrobeCtrl", function ($scope, profileService) {
	$scope.articles;
	$scope.article = {};

	$scope.getArticles = function () {
		$scope.selection = 1;
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
		$scope.selection = 2;
		var promise = profileService.getOutfits();

		promise.then(function (outfits) {
			$scope.outfits = outfits;
		});
	};

	$scope.getOutfits();
});