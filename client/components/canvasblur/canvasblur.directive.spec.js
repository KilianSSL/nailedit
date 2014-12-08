'use strict';

describe('Directive: canvasblur', function () {

  // load the directive's module
  beforeEach(module('redditCloneApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<canvasblur></canvasblur>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the canvasblur directive');
  }));
});