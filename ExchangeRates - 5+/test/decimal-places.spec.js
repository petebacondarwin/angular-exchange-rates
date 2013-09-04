describe('decimal-places', function() {
  var scope, element;
  beforeEach(module('decimal-places'));
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    element = $compile('<input ng-model="x" decimal-places="3">')(scope);
  }));

  it('should only show 3 decimal places', function() {
    scope.x = 0.12345;
    scope.$digest();
    expect(element.val()).toBe('0.123');
  });
});