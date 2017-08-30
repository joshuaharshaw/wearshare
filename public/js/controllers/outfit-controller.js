var app = angular.module("outfitApp");

// Controller for Outfits Screen
app.controller("outfitCtrl", function ($scope, profileService, $q, $routeParams, $location) {
	// Outfits Variables.
	$scope.outfits;
	$scope.outfit ={};
	$scope.outfitName;
	$scope.id= $routeParams.user_id || 1; //Route Param- Sets appropriate user info, based on the user id.
	$scope.home = true; //Variable that hides or shows the "Add Article/Outfit" buttons and other features.
	$scope.articles;
	$scope.rating;

	console.log("Controller Loaded");

	//Variables that dynamically change the URL to fit the proper user's wardrobe/outfits
	$scope.procOutfit='#!/profile/outfits';
	$scope.procWardrobe='#!/profile/wardrobe';

	if ($routeParams.user_id) { //Change many parameters to adapt to different user IDs
		$scope.home = false;
		$scope.procOutfit = '#!/profiles/' + $routeParams.user_id + '/outfits';
		$scope.procWardrobe = '#!/profiles/' + $routeParams.user_id + '/wardrobe';
	}

	$scope.getArticles = function () { //GET request to obtain correct clothing articles for a user.
		var promise = profileService.getArticles($scope.id);

		return promise;
	};

	$scope.getOutfits = function () { //GET request to obtain correct outfits for a user.
		var promise = profileService.getOutfits($scope.id);

		return promise;
	};

	$q.all([$scope.getOutfits(), $scope.getArticles()]).then(function (response) {//Double promise- Get clothing articles and outfits.
		var outfits = response[0];
		var articles = response[1];

		outfits.forEach(function (outfit) { //Find the Article that corresponds to the stored "Top/bottom/shoe id"
			outfit.top = articles.find(function (article) { // And add each article object to a new object property Top/bottom/shoe.
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

		//Sert Articles and Outfits on the scope to be processed.
		$scope.outfits = outfits;
		$scope.articles = articles;
	});

	$scope.addRating = function (event, value) {
        var scoreParams = {
        	"outfit_id": this.outfit.outfit_id,
        	"score": value
        };
        profileService.addRating(scoreParams);
			}


	$scope.switchView = function () { // Change between viewing/adding an outfit.
		$location.path('/profile/wardrobe/new-outfit');
	};

	$scope.modalShown = false;
	$scope.toggleModal = function() { //toggles the value of the modalShown variable
		$scope.modalShown = !$scope.modalShown;
		console.log("Outfit modal working");
  	$scope.modal = this.outfit;
		console.log($scope.modal);
  };
});
