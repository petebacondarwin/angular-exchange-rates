angular.module('app', [])
// Inject $http service and the number filter.
.controller('AppController', function($scope, $http, numberFilter) {
  var openExchangeRatesUrl = 'http://openexchangerates.org/api/';
  var apiKey = '?app_id=3f87c49674ef43568cbd86476e86f88f';
  
  // Make a GET retuest with $http - noting that it returns a promise
  $http.get(openExchangeRatesUrl + 'currencies.json' + apiKey).then(function(response) {
    // When the promise resolves attach the response data to the scope
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