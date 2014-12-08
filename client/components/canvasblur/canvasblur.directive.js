'use strict';

angular.module('redditCloneApp')
  .directive('canvasBlur', function ( $parse,$sce) {
    return {
      restrict: 'E',
      replace:true,
      scope: {
        src:'@',
        width:'=',
        height:'=',
        cssClass:'='
      },
      link: function(scope, element, attrs){
        scope.itemId = "canvas_" + parseInt(Math.random()*1000000000)
        var fillCanvas = function(src){
          if(!src)
            return;

          var context = element[0].getContext("2d"); // get the 2d context object
          var img     = new Image(); //create a new image

          img.onload = function(){
            console.log('onload fired');
            context.drawImage(img, 0, 0, scope.width, scope.height); // draw the image at the given location
            boxBlurCanvasRGBA( scope.itemId, 0, 0, scope.width, scope.height, 50, 3);
          };

            img.onerror = img.onabort = function(event) {
              console.log('error',event);
            };

          img.crossOrigin = '*';
          img.src = src;

        };

        scope.$watch('src', function(src){
          fillCanvas(src);
        });
      },
      template: '<canvas id="{{ itemId }}" class="{{ cssClass }}" style="width:{{width}}px; height:{{height}}px"></canvas>'
    };
  });