// Test the getRateInfo service separately from the controller
describe('getRateInfo', function() {
  var $httpBackend;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend
      .expectGET('http://openexchangerates.org/api/XX.json?app_id=3f87c49674ef43568cbd86476e86f88f')
      .respond('Dummy Response');
  }));

  it('makes a http request', inject(function(getRateInfo) {
    var resolved = false;
    getRateInfo('XX').then(function(info) {
      resolved = true;
      expect(info).toEqual('Dummy Response');
    });
    $httpBackend.flush();
    expect(resolved).toBeTruthy();
  }));
});

// Only test the controller in isolation, (i.e. mock out the getRateInfo service)
describe('AppController', function() {
  var controller, $scope;
  
  // Create a test module with a mock getRateInfo function 
  angular.module('test', ['app']).factory('getRateInfo', function() {
    // Use jasmine's spies to track whether this service gets called
    return jasmine.createSpy('getRateInfo');
  });

  beforeEach(module('test'));
  beforeEach(inject(function($rootScope, $controller, getRateInfo) {
    $scope = $rootScope;
    controller = $controller('AppController', {$scope: $scope});
  }));

  it("should set up currencies", inject(function(getRateInfo) {
    // Check that the service got called twice
    expect(getRateInfo).toHaveBeenCalled();
    expect(getRateInfo.calls.length).toEqual(2);

    // Check that we have initialized the from and to currencies
    expect($scope.fromCurrency).toBeUndefined();
    expect($scope.toCurrency).toBeUndefined();
  }));

  it("should calculate the value of the toCurrency", function() {
    // Mock up the scope properties
    $scope.fromVal = 40;
    $scope.fromCurrency = 0.5;
    $scope.toCurrency = 0.8;

    // Test the calcCurrency method
    expect($scope.calcCurrency()).toEqual(64);
  });
});