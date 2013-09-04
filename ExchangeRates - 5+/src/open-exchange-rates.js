angular.module('open-exchange-rates', [])

.constant('openExchangeRatesUrl','http://openexchangerates.org/api/')

// Provide a factory function that will be called to create a singleton getRateInfo service
.provider('getRateInfo', function() {
  var self = this;

  // A placeholder for the api, which will be inserted at config time
  self.apiKey = null;

  // $get is the factory for the service
  this.$get = ['openExchangeRatesUrl', '$http', function(openExchangeRatesUrl, $http) {
    return function(request) {
      return $http.get(openExchangeRatesUrl + request + '.json?app_id=' + self.apiKey)
        .then(function (response) { return response.data; });
    };
  }];
});