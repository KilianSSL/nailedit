'use strict';

angular.module('redditCloneApp')
  .controller('ArticleDetailCtrl', function ($scope,$http,$stateParams,$sce,socket,Auth,Article) {
    // Model for new comment
    $scope.newcomment = '';
    $scope.newcommentFocus = false;

    // Assign session / auth functions to
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isOwnerOf = Auth.isOwnerOf;

    $scope.upVoteArticle = Article.upVoteArticle;
    $scope.downVoteArticle = Article.downVoteArticle;
    $scope.deleteArticle = Article.deleteArticle;

    // todo
    $http.get('/api/articles/'+$stateParams.id).success(function(article) {
      $scope.article = article;
      if(article.image !== undefined) {
        if (article.image.indexOf('http') > -1) {
          $scope.image = $sce.trustAsResourceUrl(article.image);
        } else {
          $scope.image = $sce.trustAsResourceUrl('/assets' + article.image);
        }
      }

      socket.syncItemUpdates('article', $scope.article);
    });

    $scope.reply = function(comment) {
      $scope.newcomment = '@'+comment._user.name+" ";
      $scope.newcommentFocus = true;
    };

    // Add a new comment
    $scope.addComment = function(article) {
        if($scope.newcomment === '') {
          return;
        }
        $http.post('/api/comments/' + article._id, { text: $scope.newcomment });

        // todo there is a flaw here because the required field is complaining
        $scope.newcomment = '';
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('article');
    });
  });
