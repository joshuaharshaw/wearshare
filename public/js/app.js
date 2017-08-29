var app = angular.module("outfitApp", ["ngRoute", "angularFileUpload"]);

app.config(function($routeProvider) {

	$routeProvider.when("/home",{
		templateUrl:"views/home.html",
		controller:"homeCtrl"
	});

	$routeProvider.when("/profile", { //Home profile
		templateUrl:"views/profile.html",
		controller:"profileCtrl"
	});

	$routeProvider.when("/profiles/:user_id",{ //Home profile for other users.
		templateUrl:"views/profile.html",
		controller:"profileCtrl"
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

	$routeProvider.when("/profiles/:user_id/wardrobe", {//Other person's wardrobe
		templateUrl:"views/wardrobe.html",
		controller:"wardrobeCtrl"
	});

	$routeProvider.when("/profiles/:user_id/outfits", {//Other person's outfit
		templateUrl:"views/outfits.html",
		controller:"outfitCtrl"
	});

	});

	app.directive('outfitModal', function() {
	  return {
	    restrict: 'E',
	    scope: {
		    show: '=' //sets up a 2-way binding between the variable given to the show attribute and the show variable on our scope. //toggles modal
		  },
		  // replace: true, // Replace with the template below
		  transclude: true, // to insert content inside the directive
		  link: function(scope, element, attrs) {
		    scope.dialogStyle = {}; // update the DOM
		    if (attrs.width)
		      scope.dialogStyle.width = attrs.width;
		    if (attrs.height)
		      scope.dialogStyle.height = attrs.height;
		    scope.hideModal = function() {
					scope.show = false;
		    };
		  },
		  templateUrl: 'views/partials/outfit-modal.html' // template for outfitModal
		};
	});

	app.directive('articlesModal', function() {
	  return {
	    restrict: 'E',
	    scope: {
		    show: '='
		  },
		  // replace: true,
		  transclude: true, // to insert content inside 
		  link: function(scope, element, attrs) {
		    scope.dialogStyle = {}; // update the DOM
		    if (attrs.width)
		      scope.dialogStyle.width = attrs.width;
		    if (attrs.height)
		      scope.dialogStyle.height = attrs.height;
		    scope.hideModal = function() {
					scope.show = false;

		    };
		  },
		  templateUrl: 'views/partials/article-modal.html'
		};
	});
