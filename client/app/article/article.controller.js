'use strict';

angular.module('redditCloneApp')
  .controller('ArticleCtrl', function ($scope,$http,$state,$stateParams,socket,Auth,Article,$modal,$sce) {
    // Article model
    $scope.articles = [];

    function reset()  {
      $scope.newarticle = {
        title:'',
        image:'',
        imageUuid:'',
        url:'',
        description:'',
        category:''
    };
    }
    reset();

    // Assign session / auth functions to
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isOwnerOf = Auth.isOwnerOf;

    $scope.upVoteArticle = Article.upVoteArticle;
    $scope.downVoteArticle = Article.downVoteArticle;
    $scope.deleteArticle = Article.deleteArticle;
    $scope.getFilter = Article.getFilter;

    // Fetch the articles and keep them in sync
    $http.get('/api/articles').success(function(articles) {
      $scope.articles = articles;
      socket.syncUpdates('article', $scope.articles);
    });

    // Add Article Modal
    $scope.addArticle = function() {
      return $modal.open({
        templateUrl: 'app/article/article-modal.html',
        scope:$scope,
        resolve:{
          fetched:function() {
            var exp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
            if($scope.newarticle.title.match(exp)) {
              var params = {
                url:$scope.newarticle.title
              };
              return $http.get('/api/fetch/',{params:params}).then(function(resp) {
                return resp.data;
              })
            } else return {};
          }
        },
        controller:'ArticleModalCtrl'
      }).result.then(function(res) {
          if(res.title === '' && res.description === '') {
            return;
          }

          $http.post('/api/articles',$scope.newarticle);
          reset();
      },function() {
          reset();
      });
    };

    $scope.detail = function(article) {
      $state.go('article-detail',{id:article._id});
    };

    $scope.getTrustedUrl = function(image) {
      if(image !== undefined) {
        return $sce.trustAsResourceUrl('assets/'+image);
      } else {
        return false;
      }
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('article');
    });

  });
