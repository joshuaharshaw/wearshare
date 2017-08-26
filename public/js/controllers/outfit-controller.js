var app = angular.module("outfitApp");

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

	$scope.switchView = function (view) {
		$scope.ovswitch = view;
	}
});