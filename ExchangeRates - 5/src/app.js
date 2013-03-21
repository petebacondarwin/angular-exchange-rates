// Our app module now has some dependencies
angular.module('app', ['open-exchange-rates', 'ui.bootstrap.typeahead', 'decimal-places'])

// Configure the getRateInfo service with an api key
.config(['getRateInfoProvider', function(getRateInfoProvider) {
  getRateInfoProvider.apiKey = '3f87c49674ef43568cbd86476e86f88f';
}])

.controller('AppController', [
  '$scope',  'getRateInfo', 'numberFilter', '$q',
    function($scope, getRateInfo, numberFilter, $q) {

      // Grab the promises from the two calls  
      var namesPromise = getRateInfo('currencies');
      var ratesPromise = getRateInfo('latest');

      // Use the $q.all method to run code only when both promises have been resolved
      $q.all([namesPromise, ratesPromise]).then(function(responses) {

        var currencyNames = responses[0];
        var currencyRates = responses[1].rates;

        // Generate the currencies array
        $scope.currencies = [];
        angular.forEach(currencyNames, function(name, code) {
          var rate = currencyRates[code];
          $scope.currencies.push({
            code: code,
            label : name + " (" + numberFilter(rate, 2) + " / USD)",
            rate: rate
          });
        });

        // Initialize the model
        $scope.fromCurrency = $scope.currencies[Math.floor((Math.random()*$scope.currencies.length-1))];
        $scope.toCurrency = $scope.currencies[Math.floor((Math.random()*$scope.currencies.length-1))];
        $scope.fromVal = 1;
      });

      function getRate(currency) {
        return currency && currency.rate;
      }

      $scope.updateToVal = function() {
        $scope.toVal = $scope.fromVal / getRate($scope.fromCurrency) * getRate($scope.toCurrency);
      };

      $scope.updateFromVal = function() {
        $scope.fromVal = $scope.toVal / getRate($scope.toCurrency) * getRate($scope.fromCurrency);
      };

      $scope.$watch('fromCurrency', $scope.updateToVal);
      $scope.$watch('toCurrency', $scope.updateToVal);
}]);