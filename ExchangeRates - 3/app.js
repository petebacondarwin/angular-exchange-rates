angular.module('app', [])

.controller('AppController', function($scope, $http, numberFilter) {
  var openExchangeRatesUrl = 'http://openexchangerates.org/api/';
  var apiKey = '?app_id=3f87c49674ef43568cbd86476e86f88f';
  
  $http.get(openExchangeRatesUrl + 'currencies.json' + apiKey).then(function(response) {
    $scope.currencyNames = response.data;
  });
  
  $http.get(openExchangeRatesUrl + 'latest.json' + apiKey).then(function(response) {
    $scope.currencyValues = response.data.rates;
  });

  $scope.getCurrencyLabel = function(code, value) {
    return $scope.currencyNames[code] + " (" + numberFilter(value, 2) + " / USD)";
  };


  $scope.calcCurrency = function() {
    return $scope.fromVal / $scope.fromCurrency * $scope.toCurrency;
  };
});