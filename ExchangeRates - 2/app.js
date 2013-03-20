angular.module('app', [])

.controller('AppController', function($scope) {
  $scope.currencies = [
    { name: 'British Pound Sterling', value: 0.661062 },
    { name: 'Euro', value: 0.774538 }
  ];

  $scope.fromCurrency = $scope.currencies[0];
  $scope.toCurrency = $scope.currencies[1];

  $scope.calcCurrency = function() {
    return $scope.fromVal / $scope.fromCurrency.value * $scope.toCurrency.value;
  };
});