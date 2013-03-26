angular.module('decimal-places', [])

// A new directive that will limit the number of decimal places that are displayed in an input
// usage: <input ng-model="xxx" decimal-places="2">
.directive('decimalPlaces', function() {
  
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      function limitDecimals(value) {
        var exponent = Math.pow(10, attrs.decimalPlaces);
        return Math.round(value * exponent)/ exponent;
      }

      ngModel.$formatters.push(limitDecimals);
      ngModel.$parsers.push(limitDecimals);

      element.bind('blur', function() {
        element.val(limitDecimals(element.val()));
      });
    }
  };
});