var app = angular.module("outfitApp");

app.service("profileService" , function ($http) {
	this.getArticles = function () {
		return $http.get('/users/1/articles').then(function (response) {
			return response.data;
		});
	};

	this.getOutfits = function () {
		return $http.get('/users/1/outfits').then(function (response) {
			return response.data;
		});
	};

	this.postArticle = function (article) {
		return $http.post('/users/1/articles', article).then(function (response) {
			return response;
		});
	};

	this.postOutfit = function (outfit) {
		return $http.post('/users/1/outfits', outfit).then(function (response){
			return response;
		});
	};
});