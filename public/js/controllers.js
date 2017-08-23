var app = angular.module("outfitApp");

app.controller("profileCtrl", function ($scope, profileService) {
	$scope.articles;
	$scope.outfits;
	$scope.selection=1;

	$scope.article = {};
	$scope.outfit ={};

	$scope.getArticles = function () {
		$scope.selection = 1;
		var promise = profileService.getArticles();

		promise.then(function (articles) {
			$scope.articles = articles;
			console.log($scope.articles);

		});
	};

	$scope.getArticles();

	$scope.getOutfits = function () {

		$scope.selection = 2;
		var promise = profileService.getOutfits();

		promise.then(function (outfits) {
			$scope.outfits = outfits;
		});
	};

	$scope.switchView = function(number) {
		$scope.selection = number;
	};

	$scope.postArticle = function () {
		var submitted = JSON.stringify($scope.article);
		console.log(submitted);
		profileService.postArticle(submitted);
	};
});


app.controller("outfitCtrl". function ($scope, profileService) {

});