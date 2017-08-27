var app = angular.module("outfitApp");

app.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "dr1gz6f3y")
      .set("upload_preset", "sagtqgrr");
}]);
