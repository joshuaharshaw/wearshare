var app = angular.module("outfitApp", ["ngRoute"]);

app.config(function($routeProvider) {

	$routeProvider.when("/profile/outfits", {
		templateUrl:"views/profile.html",
		controller:"profileCtrl"
	});
	
	$routeProvider.when("/home",{
		templateUrl:"views/home.html"
	});

});