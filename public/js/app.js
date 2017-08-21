var app = angular.module("outfitApp", ["ngRoute"]);

app.config(function($routeProvider) {
	
	$routeProvider.when("/profile", {
		templateUrl:"views/profile.html"
	});
});

// app.config(['cloudinaryProvider', function (cloudinaryProvider) {
//   cloudinaryProvider
//       .set("cloud_name", "dr1gz6f3y");
// }]);