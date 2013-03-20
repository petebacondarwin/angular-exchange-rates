// Declare a new angular module with no dependencies
angular.module('app', [])
// Add a controller to this module
// ... the current scope will be injected when instantiated
.controller('AppController', function($scope) {
  // Attach data (model) to scope
  $scope.currencies = [
    { name: 'British Pound Sterling', value: 0.661062 },
    { name: 'Euro', value: 0.774538 }
  ];
  $scope.fromCurrency = $scope.currencies[0];
  $scope.toCurrency = $scope.currencies[1];

  // Attach behaviour (function) to the scope
  $scope.calcCurrency = function() {
    return $scope.fromVal / $scope.fromCurrency.value * $scope.toCurrency.value;
  };
});