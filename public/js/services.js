var app = angular.module("outfitApp");

app.service("profileService" , function ($http) {
	this.getArticles = function () {
		return $http.get('/users/2/articles').then(function (response) {
			return response.data;
		});
	};
});