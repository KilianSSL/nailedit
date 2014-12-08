'use strict';

angular.module('redditCloneApp')
  .controller('ArticleModalCtrl', function ($scope,$sce,$modalInstance,$upload,fetched) {
    // in case got a fetch result, we want to flip around some values
    if(fetched.title !== undefined) {
      $scope.newarticle.url = $scope.newarticle.title;
      $scope.newarticle.title =  fetched.title;

      // oh wow, we even got an image. beauuuutiful.
      if(fetched.imageUrl !== undefined && fetched.imageUrl !== '') {
        $scope.newarticle.image = fetched.imageUrl;
        $scope.image = $sce.trustAsUrl('/assets'+fetched.imageUrl);
        $scope.newarticle.imageUuid = fetched.uuid;
      }
    }

    // the Upload method
    $scope.onFileSelect = function($files) {
        var file = $files[0];
        $scope.upload = $upload.upload({
          url: 'api/uploads',
          file:file
        }).progress(function(evt) {
            // todo if time left :)
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data) {
            $scope.newarticle.image = data.imageUrl;
            $scope.image = $sce.trustAsResourceUrl('/assets'+$scope.newarticle.image);
            $scope.newarticle.imageUuid = data.uuid;
        }).error(function() {

        });
    };

    // ready to post that article
    $scope.post = function () {
      if($scope.articleForm.$invalid) {
        return;
      }

      $modalInstance.close($scope.newarticle);
    };

    // nope, get rid of that crap
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
