angular.module('decimal-places', [])

// A new directive that will limit the number of decimal places that are displayed in an input
// usage: <input ng-model="xxx" decimal-places="2">
.directive('decimalPlaces', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$formatters.push(function(value) {
        var exponent = Math.pow(10, attrs.decimalPlaces);
        return Math.round(value * exponent)/ exponent;
      });
    }
  };
});