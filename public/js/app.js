var app = angular.module("outfitApp", ["ngRoute", "angularFileUpload"]);

app.config(function($routeProvider) {

	$routeProvider.when("/home",{
		templateUrl:"views/home.html",
		controller:"homeCtrl"
	});

	$routeProvider.when("/users/:user_id",{
		templateUrl:"views/profile.html",
		controller:"profileCtrl"
	});

	$routeProvider.when("/profile", {
		templateUrl:"views/profile.html"
	});

	$routeProvider.when("/profile/outfits", {
		templateUrl:"views/outfits.html",
		controller:"outfitCtrl"
	});

	$routeProvider.when("/profile/wardrobe", {
		templateUrl:"views/wardrobe.html",
		controller:"wardrobeCtrl"
	});

	$routeProvider.when("/profile/:user_id/wardrobe", {
		templateUrl:"views/wardrobe.html",
		controller:"wardrobeCtrl"
	});

	$routeProvider.when("/profile/:user_id/outfits", {
		templateUrl:"views/outfits.html",
		controller:"controllers/outfitCtrl"
	});

	$routeProvider.when("/profile/:user_id/outfits", {
		templateUrl:"views/outfits.html",
		controller:"controllers/outfitCtrl"
	});
});
