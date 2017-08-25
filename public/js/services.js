var app = angular.module("outfitApp");

app.service("profileService" , function ($http) {
	this.getArticles = function (id) {
		return $http.get('/users/' + id + '/articles').then(function (response) {
			return response.data;
		});
	};

	this.getOutfits = function (id) {
		return $http.get('/users/'+ id +'/outfits').then(function (response) {
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

	this.addRating = function (currentOutfit, score, rating) {
        return $http.post('/outfits/' + currentOutfit + '/5' , rating).then(function (response){
            return response;
        });
    }

	this.getUsers = function () {
		return $http.get('/users').then(function (response) {
			return response.data;
		});
	};

	this.getUser = function (id) {
		return $http.get('/users/' + id + 'wardrobe').then(function (response) {
			return response.data;
		});
	};
});