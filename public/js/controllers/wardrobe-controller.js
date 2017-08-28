var app = angular.module("outfitApp");

// Controller for Wardrobe Screen
app.controller("wardrobeCtrl", function ($scope, profileService, $q, $routeParams, FileUploader) {
	$scope.articles; //All clothing articles for a specific user ID. Obtained on page load.
	$scope.article = {}; //Object for a new clothing article to be POSTed. 
	$scope.id=$routeParams.user_id || 1; //Route Param. Determines appropriate user ID for entire page.
	$scope.avswitch = 1;
	$scope.outfit = { //Object for the "Add article" functionality. Each property is displayed in the "preview" box
		topArticle : null,
		bottomArticle : null,
		shoes : null
	};
	$scope.home=true;
	//Variables that dynamically set the path on the navigation buttons,taking into account the
	$scope.procOutfit='#!/profile/outfits';
	$scope.procWardrobe='#!/profile/wardrobe';
	$scope.preview= $routeParams.show || false; //Show or hide the "preview" boxed based on this value. 

	if ($routeParams.user_id) { //For someone else's profile. Disable Add/Edit functionality and change navigation paths. 
		$scope.procOutfit = '#!/profile/' + $routeParams.user_id + '/outfits';
		$scope.procWardrobe = '#!/profile/' + $routeParams.user_id + '/wardrobe';
		$scope.home=false;
	}

	$scope.getArticles = function () { //GET request- Obtain all clothing articles for a specific user id.
		var promise = profileService.getArticles($scope.id);

		promise.then(function (articles) {
			$scope.articles = articles;
			console.log($scope.articles);
		});
	};

	$scope.postArticle = function () {//Send the collected data to the server as a new clothing article. 
		var submitted = JSON.stringify($scope.article);
		console.log(submitted);
		profileService.postArticle(submitted);
	};

	$scope.switchView = function (view) { //Change etween viewing/adding articles of clothing. 
		$scope.avswitch = view;
	}


	$scope.uploader = new FileUploader({
		url: '/users/' + $scope.id + '/articles'
	});
	
	$scope.uploader.onBeforeUploadItem = function ( item ) {
		console.log('onBeforeUploadItem', item);
    	item.formData = [{ article_type: $scope.article.article_type, article_name: $scope.article.article_name, article_desc: $scope.article.article_desc }];
	};

	$scope.togglePreview = function () { //Toggle the "preview" box.
		$scope.outfit = { //Reset the object, to negate clicking before the "preview" was active. Also to reset on close.
			topArticle : null,
			bottomArticle : null,
			shoes : null
		};

		if ($scope.preview) { //Checks $scope.preview variable and reverses its state to close or open the "preview" box.
			$scope.preview=false;
		} else $scope.preview=true;
	}

	$scope.select = function (article) { //Move selected item to the preview display
		if (article.article_type === "top") {
			$scope.outfit.topArticle = article;
		} else if (article.article_type === "bottom") {
			$scope.outfit.bottomArticle = article;
		} else if (article.article_type === "shoes") {
			$scope.outfit.shoes = article;
		}
	};
	
	console.log($scope.preview, $routeParams.show);
	$scope.getArticles(); //Immediately call the function to obtain all outfits.
});