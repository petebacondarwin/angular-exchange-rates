describe('AppController', function() {
  var controller, $scope;
  beforeEach(module('app'));
  beforeEach(inject(function($httpBackend, $rootScope, $controller) {
    $httpBackend
      .expectGET('http://openexchangerates.org/api/currencies.json?app_id=3f87c49674ef43568cbd86476e86f88f')
      .respond([{ GBP : 'British Pound Sterling'}, { EUR: 'Euros' }]);
    
    $httpBackend
      .expectGET('http://openexchangerates.org/api/latest.json?app_id=3f87c49674ef43568cbd86476e86f88f')
      .respond({ rates: [ { GBP : 0.5 }, { EUR: 0.8 }]});    

    $scope = $rootScope;
    controller = $controller('AppController', {$scope: $scope});
    $httpBackend.flush();
  }));

  it("should set up currencies", function() {
    // Check that there is an array of currencies on the scope
    expect($scope.currencyNames.length).toEqual(2);
    expect($scope.currencyValues.length).toEqual(2);

    // Check that we have initialized the from and to currencies
    expect($scope.fromCurrency).toBeUndefined();
    expect($scope.toCurrency).toBeUndefined();
  });

  it("should calculate the value of the toCurrency", function() {
    // Mock up the scope properties
    $scope.fromVal = 40;
    $scope.fromCurrency = 0.5;
    $scope.toCurrency = 0.8;

    // Test the calcCurrency method
    expect($scope.calcCurrency()).toEqual(64);
  });
});