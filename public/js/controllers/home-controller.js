var app = angular.module("outfitApp");

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

	$scope.getAllArticles = function () {
		var promise = profileService.getAllArticles();

		return promise;
	}

	$scope.getAllOutfits = function () {
		var promise = profileService.getAllOutfits();

		return promise;
	}

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

	$q.all([$scope.getAllOutfits(), $scope.getAllArticles()]).then(function (response) {
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
				$scope.top = [];

				top.forEach(function (item) {
					var target = outfits.find(function (outfit) {
						return outfit.outfit_id === item.outfit_id;
					});

					$scope.top.push(target);
				});
				console.log("Top Outfits: ",  $scope.top);
			});
		};

		$scope.getNew = function () {
			var promise = profileService.getNew();

			promise.then(function (newOuts) {
				var newOutfits = newOuts;

				console.log(newOutfits);

				newOutfits.forEach(function (item) {
					var target = outfits.find(function (outfit) {
						return outfit.outfit_id === item.outfit_id;
					});

					item.outfit = target;
				});

				$scope.new = newOutfits;
				console.log("Newest Outfits: ",  $scope.new);
			});
		};

		$scope.getTop();
		$scope.getNew();

		$scope.outfits = outfits;
	});

	$scope.getUsers = function () {
		var users = profileService.getUsers();

		users.then(function (users) {
			$scope.users = users;
			console.log("Users: " , $scope.users);
			$scope.users.shift();
		});
	};

	$scope.getUser = function () {
		var currentId= this.user.user_id;
		$location.path('/profiles/' + currentId);
 	};

	$scope.addRating = function (event, value) {
        var scoreParams = {
        	"outfit_id": this.outfit.outfit_id,
        	"score": value
        };
        profileService.addRating(scoreParams);
    };

	$scope.getUsers();

	$scope.modalShown = false;

	$scope.toggleModal = function(toggle) { //toggles the value of the modalShown variable
		$scope.modalShown = !$scope.modalShown;
		if ($scope.modal=this.best){
			$scope.modal===toggle;
			console.log("topR");
		}
		else if ($scope.modal=this.newest.outfit){
			$scope.modal===toggle;
			console.log("newest");
		}
	};
});
