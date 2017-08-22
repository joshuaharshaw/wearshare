var app = angular.module("outfitApp");

app.controller("profileCtrl", function ($scope, profileService) {
	$scope.articles;

	$scope.getArticles = function () {
		var promise = profileService.getArticles();

		promise.then(function (articles) {
			$scope.articles = articles;
		});
	};

	$scope.getArticles();
});