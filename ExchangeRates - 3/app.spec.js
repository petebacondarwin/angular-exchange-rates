describe('AppController', function() {
  var controller, $scope;
  beforeEach(module('app'));
  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope;
    controller = $controller('AppController', {$scope: $scope});
  }));

  it("should set up currencies", function() {
    // Check that there is an array of currencies on the scope
    expect($scope.currencies.length).toBeGreaterThan(0);
    
    // Check that we have initialized the from and to currencies
    expect($scope.fromCurrency).toBe($scope.currencies[0]);
    expect($scope.toCurrency).toBe($scope.currencies[1]);
  });

  it("should calculate the value of the toCurrency", function() {
    // Mock up the scope properties
    $scope.fromVal = 40;
    $scope.fromCurrency = { value: 0.5 };
    $scope.toCurrency = { value: 0.8 };

    // Test the calcCurrency method
    expect($scope.calcCurrency()).toEqual(64);
  });
});