var app = angular.module("outfitApp", ["ngRoute", "angularFileUpload"]);

app.config(function($routeProvider) {

	$routeProvider.when("/home",{
		templateUrl:"views/home.html",
		controller:"homeCtrl"
	});

	$routeProvider.when("/users/:user_id",{ //Home profile for other users.
		templateUrl:"views/profile.html",
		controller:"profileCtrl"
	});

	$routeProvider.when("/profile", { //Home profile
		templateUrl:"views/profile.html",
		controller:"homeCtrl"
	});

	$routeProvider.when("/profile/outfits", { //Home outfits
		templateUrl:"views/outfits.html",
		controller:"outfitCtrl"
	});

	$routeProvider.when("/profile/wardrobe", { //Home Wardrobe
		templateUrl:"views/wardrobe.html",
		controller:"wardrobeCtrl"
	});

	$routeProvider.when("/profile/wardrobe/:show", { //Home Wardrobe
		templateUrl:"views/wardrobe.html",
		controller:"wardrobeCtrl"
	});

	$routeProvider.when("/profile/:user_id/wardrobe", {//Other person's wardrobe
		templateUrl:"views/wardrobe.html",
		controller:"wardrobeCtrl"
	});

	$routeProvider.when("/profile/:user_id/outfits", {//Other person's outfit
		templateUrl:"views/outfits.html",
		controller:"outfitCtrl"
	});
});
