var app = angular.module("outfitApp");

//Controller for user Profile Page//
app.controller("profileCtrl", function ($scope, profileService, $routeParams, $location) {
	$scope.id = $routeParams.user_id || 1;
	$scope.home = true;

	//Variables that dynamically change the URL to fit the proper user's wardrobe/outfits
	$scope.procOutfit='#!/profile/outfits';
	$scope.procWardrobe='#!/profile/wardrobe';

	if ($routeParams.user_id) { //Change many parameters to adapt to different user IDs
		$scope.home = false;
		$scope.procOutfit = '#!/profiles/' + $routeParams.user_id + '/outfits';
		$scope.procWardrobe = '#!/profiles/' + $routeParams.user_id + '/wardrobe';
	}

	$scope.getProfiles = function(){
	  var promise = profileService.getUser($scope.id);

	  promise.then(function(user){
	    $scope.profile = user[0];
	    console.log($scope.profile);
	  });
	};

	$scope.getProfiles();
});
