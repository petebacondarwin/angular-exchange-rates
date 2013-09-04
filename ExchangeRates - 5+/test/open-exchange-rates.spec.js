// Test the getRateInfo service separately from the controller
describe('getRateInfo', function() {
  var $httpBackend;

  beforeEach(function() {
    angular.module('test', ['open-exchange-rates']).config(function (getRateInfoProvider) {
      getRateInfoProvider.apiKey = "XYZ123";
    });
  });

  beforeEach(module('test'));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend
      .expectGET('http://openexchangerates.org/api/DUMMY.json?app_id=XYZ123')
      .respond('Dummy Response');
  }));

  it('makes a http request', inject(function(getRateInfo) {
    var resolved = false;
    getRateInfo('DUMMY').then(function(info) {
      resolved = true;
      expect(info).toEqual('Dummy Response');
    });
    $httpBackend.flush();
    expect(resolved).toBeTruthy();
  }));
});

