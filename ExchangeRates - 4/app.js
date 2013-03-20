angular.module('app', [])

.constant('apiKey', '?app_id=3f87c49674ef43568cbd86476e86f88f')

.constant('openExchangeRatesUrl','http://openexchangerates.org/api/')

.controller('AppController', [
  '$scope', 'apiKey', 'openExchangeRatesUrl', '$http', 'numberFilter', '$q',
  function($scope, apiKey, openExchangeRatesUrl, $http, numberFilter, $q) {
  
  var namesPromise = $http.get(openExchangeRatesUrl + 'currencies.json' + apiKey);
  var ratesPromise = $http.get(openExchangeRatesUrl + 'latest.json' + apiKey);

  $q.all([namesPromise, ratesPromise]).then(function(responses) {
    $scope.currencyNames = responses[0].data;
    $scope.currencyValues = responses[1].data.rates;
  });

  $scope.getCurrencyLabel = function(code, value) {
    return $scope.currencyNames[code] + " (" + numberFilter(value, 2) + " / USD)";
  };

  $scope.calcCurrency = function() {
    return $scope.fromVal / $scope.fromCurrency * $scope.toCurrency;
  };
}]);