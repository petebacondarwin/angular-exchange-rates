angular.module('app', [])

.constant('apiKey', '?app_id=3f87c49674ef43568cbd86476e86f88f')

.constant('openExchangeRatesUrl','http://openexchangerates.org/api/')

.factory('getRateInfo', [
  'apiKey', 'openExchangeRatesUrl', '$http',
    function(apiKey, openExchangeRatesUrl, $http) {
      return function(type) {
        return $http.get(openExchangeRatesUrl + type + '.json' + apiKey).then(function (response) {
          return response.data;
        });
      };
}])

.controller('AppController', [
  '$scope',  'getRateInfo', 'numberFilter', '$q',
    function($scope, getRateInfo, numberFilter, $q) {
  
      var namesPromise = getRateInfo('currencies');
      var ratesPromise = getRateInfo('latest');

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