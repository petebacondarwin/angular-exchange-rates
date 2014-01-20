// Our app module now has some dependencies
angular.module('app', ['ngSanitize', 'open-exchange-rates', 'ui.bootstrap', 'decimal-places'])

// Configure the getRateInfo service with an api key
.config(['getRateInfoProvider', function(getRateInfoProvider) {
  getRateInfoProvider.apiKey = '3f87c49674ef43568cbd86476e86f88f';
}])

.value('pickRandom', function pickRandom(max) {
  return Math.floor((Math.random()*max));
})

.value('getRate', function getRate(obj) {
  return obj && obj.currency && obj.currency.rate;
})

// Some other change

.factory('currencyPromise', ['getRateInfo', '$q', 'numberFilter', function(getRateInfo, $q, numberFilter) {
  return $q.all([getRateInfo('currencies'), getRateInfo('latest')]).then(function(responses) {

    var currencyNames = responses[0];
    var currencyRates = responses[1].rates;
    var currencies = [];

    // Generate the currencies array
    angular.forEach(currencyNames, function(name, code) {
      var rate = currencyRates[code];
      currencies.push({
        code: code,
        label : name + " (" + numberFilter(rate, 2) + " / USD)",
        rate: rate
      });
    });

    return currencies;
  });
}])

.controller('AppController', [
  '$scope',  'currencyPromise', 'pickRandom', 'getRate',
    function($scope, currencyPromise, pickRandom, getRate) {

      $scope.from = {};
      $scope.toCurrencies = [];

      $scope.updateValues = function(changed) {
        var changedCurrency = getRate(changed);
        if ( changedCurrency ) {
          angular.forEach($scope.toCurrencies, function(to) {
            if ( to !== changed ) {
              to.value = changed.value / changedCurrency * getRate(to);
            }
          });
        }
      };

      $scope.addTo = function() {
        var to = {
          currency: $scope.currencies[pickRandom($scope.currencies.length-1)]
        };
        $scope.toCurrencies.push(to);
        $scope.updateValues($scope.toCurrencies[0]);
      };

      currencyPromise.then(function(currencies) {
        $scope.currencies = currencies;

        $scope.addTo();
        $scope.addTo();
      });
}])

.controller('CurrencyController', ['$scope', function($scope) {
  $scope.$watch('to', function(to) {
    $scope.updateValues(to);
  }, true);
}]);