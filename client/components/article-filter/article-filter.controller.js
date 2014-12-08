'use strict';

angular.module('redditCloneApp')
  .controller('ArticleFilterCtrl', function ($scope,Article) {
    $scope.setFilter = Article.setFilter;
    $scope.isActive = function(filter) {
      return filter == Article.getFilter();
    }
  });