'use strict';

angular.module('redditCloneApp')
  .factory('Article', function ($http,Auth) {
    var factory = {
      activeFilter:'',
      upVoteArticle:function(article,type) {
        $http.post('/api/votes/' + article._id,{type:'upvote'});
      },
      downVoteArticle:function(article) {
        $http.post('/api/votes/' + article._id, {type: 'downvote'});
      },
      deleteArticle:function(article) {
        if (Auth.isOwnerOf(article) || Auth.isAdmin()) {
          return $http.delete('/api/articles/' + article._id);
        }
      },
      getFilter:function() {
        return factory.activeFilter;
      },
      setFilter:function(filter) {
        factory.activeFilter = filter;
      }
    };

    // Public API here
    return {
      upVoteArticle:factory.upVoteArticle,
      downVoteArticle:factory.downVoteArticle,
      deleteArticle:factory.deleteArticle,
      getFilter:factory.getFilter,
      setFilter:factory.setFilter
    };
  });
