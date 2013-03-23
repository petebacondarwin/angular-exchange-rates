// Our app module now has some dependencies
angular.module('app', ['open-exchange-rates', 'ui.bootstrap.typeahead', 'decimal-places'])

// Configure the getRateInfo service with an api key
.config(['getRateInfoProvider', function(getRateInfoProvider) {
  getRateInfoProvider.apiKey = '3f87c49674ef43568cbd86476e86f88f';
}])

.controller('AppController', [
  '$scope',  'getRateInfo', 'numberFilter', '$q',
    function($scope, getRateInfo, numberFilter, $q) {

      function pickRandom(max) {
        return Math.floor((Math.random()*max));
      }

      function getRate(currency) {
        return currency && currency.rate;
      }

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
        $scope.from = {
          currency: $scope.currencies[pickRandom($scope.currencies.length-1)],
          value: 1
        };
        $scope.to = {
          currency: $scope.currencies[pickRandom($scope.currencies.length-1)],
          value: null
        };
      });

      $scope.updateValue = function(from, to) {
        to.value = from.value / getRate(from.currency) * getRate(to.currency);
      };

      // Update values if currencies change
      $scope.$watch('from.currency', function() { $scope.updateValue($scope.from, $scope.to); });
      $scope.$watch('to.currency', function() { $scope.updateValue($scope.from, $scope.to); });
}]);