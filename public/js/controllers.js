var app = angular.module("outfitApp");

// Controller for Wardrobe Screen
app.controller("wardrobeCtrl", function ($scope, profileService, $q, $routeParams) {
	$scope.articles;
	$scope.article = {};
	$scope.id=$routeParams.user_id || 1;
	$scope.avswitch = 2;
	$scope.outfit = {
		topArticle : null,
		bottomArticle : null,
		shoes : null
	};
	$scope.homeOrNo = 1;
	$scope.procOutfit='#!/profile/outfits';
	$scope.procWardrobe='#!/profile/wardrobe';

	if ($routeParams.user_id) {
		$scope.homeOrNo = 0;
		$scope.procOutfit = '#!/profile/' + $routeParams.user_id + '/outfits';
		$scope.procWardrobe = '#!/profile/' + $routeParams.user_id + '/wardrobe';
	}

	$scope.getArticles = function () {

		var promise = profileService.getArticles($scope.id);

		promise.then(function (articles) {
			$scope.articles = articles;
			console.log($scope.articles);
		});
	};

	$scope.postArticle = function () {
		var submitted = JSON.stringify($scope.article);
		console.log(submitted);
		profileService.postArticle(submitted);
	};

	$scope.getArticles();
});

// Controller for Outfits Screen
app.controller("outfitCtrl", function ($scope, profileService, $q,$routeParams) {
	$scope.outfits;
	$scope.outfit ={};
	$scope.outfitName;
	$scope.id= $routeParams.user_id || 1;
	$scope.homeOrNo = 1;
	$scope.articles;
	$scope.rating;
	$scope.procOutfit='#!/profile/outfits';
	$scope.procWardrobe='#!/profile/wardrobe';

	$scope.avswitch = 3;

	if ($routeParams.user_id) {
		$scope.homeOrNo = 0;
		$scope.avswitch = 1;
		$scope.procOutfit = '#!/profile/' + $routeParams.user_id + '/outfits';
		$scope.procWardrobe = '#!/profile/' + $routeParams.user_id + '/wardrobe';
	}

	$scope.getArticles = function () {
		var promise = profileService.getArticles($scope.id);

		return promise;
	};

	$scope.getOutfits = function () {
		var promise = profileService.getOutfits($scope.id);

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
			"shoe_id":$scope.outfit.shoes.article_id,
			"outfit_name":$scope.outfitName
		};

		profileService.postOutfit(outfit);
	};

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
		console.log(outfits);
		$scope.outfits = outfits;
		$scope.articles = articles;
	});
	
	$scope.addRating = function () {
        console.log(this);
        var currentOutfit = this.outfit.outfit_id;
        var score = this.value;
        profileService.addRating(currentOutfit, score);
    };

});

// Controller for Home Screen
app.controller("homeCtrl", function ($scope, profileService, $routeParams, $location, $q) {
	$scope.outfits;
	$scope.outfit ={};
	$scope.id= $routeParams.user_id || 1;
	$scope.articles;
	$scope.rating;

	$scope.getArticles = function () {
		var promise = profileService.getArticles($scope.id);

		return promise;
	};

	$scope.getOutfits = function () {
		var promise = profileService.getOutfits($scope.id);

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

		$scope.getTop = function () {
			var promise = profileService.getTop();

			promise.then(function (top) {
				$scope.top = top;
				console.log($scope.top);
			});
		};
		
		$scope.getTop();

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

	$scope.getUser = function () {
		var currentId= this.user.user_id;
		$location.path('/profile/' + currentId + '/wardrobe');
 	};

	$scope.getUsers();

});
