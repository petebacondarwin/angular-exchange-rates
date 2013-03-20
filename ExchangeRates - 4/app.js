angular.module('app', [])

// Add two constant values to the app module that can then be injected
.constant('apiKey', '?app_id=3f87c49674ef43568cbd86476e86f88f')
.constant('openExchangeRatesUrl','http://openexchangerates.org/api/')

// Provide a factory function that will be called to create a singleton getRateInfo service
.factory('getRateInfo', [
  // Injection annotation to cope with minification changing parameter names
  'apiKey', 'openExchangeRatesUrl', '$http',
    function(apiKey, openExchangeRatesUrl, $http) {
      return function(type) {
        return $http.get(openExchangeRatesUrl + type + '.json' + apiKey).then(function (response) {
          return response.data;
        });
      };
}])

.controller('AppController', [
  // Inject our new getRateInfo service and $q into the controller
  '$scope',  'getRateInfo', 'numberFilter', '$q',
    function($scope, getRateInfo, numberFilter, $q) {

      // Grab the promises from the two calls  
      var namesPromise = getRateInfo('currencies');
      var ratesPromise = getRateInfo('latest');

      // Use the $q.all method to run code only when both promises have been resolved
      $q.all([namesPromise, ratesPromise]).then(function(responses) {
        $scope.currencyNames = responses[0];
        $scope.currencyValues = responses[1].rates;
      });

      $scope.getCurrencyLabel = function(code, value) {
        return $scope.currencyNames[code] + " (" + numberFilter(value, 2) + " / USD)";
      };

      $scope.calcCurrency = function() {
        return $scope.fromVal / $scope.fromCurrency * $scope.toCurrency;
      };
}]);