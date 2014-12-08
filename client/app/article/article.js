'use strict';

angular.module('redditCloneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article-trending', {
        url: '/',
        templateUrl: 'app/article/article-trending.html',
        controller: 'ArticleCtrl'
      })
      .state('article-latest', {
        url: '/latest',
        templateUrl: 'app/article/article-latest.html',
        controller: 'ArticleCtrl'
      })
      .state('article-detail', {
        url: '/detail/:id',
        templateUrl: 'app/article/article-detail.html',
        controller: 'ArticleDetailCtrl'
      });
  });