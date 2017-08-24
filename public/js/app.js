var app = angular.module("outfitApp", ["ngRoute"]);

app.config(function($routeProvider) {

	$routeProvider.when("/home",{
		templateUrl:"views/home.html",
		controller:"outfitCtrl"
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

});
