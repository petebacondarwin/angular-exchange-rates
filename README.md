# Exchange Rate Application Demo
A simple demo of a currency converter application

## ExchangeRates – 0
Hard coded simplest example

  * angular.js script
  * ng-app
  * ng-model
  * ng-bind ( {{}} )
  * expressions and filters


```
Pounds: <input ng-model="from">
Euros: <span ng-bind="from * 1.953 | number : 2"></span>
```  

## ExchangeRates – 1
Styled and currency choice
  * bootstrap CSS
  * select directive with static options


```
<select id="fromCurrency" ng-model="fromCurrency" class="span3">
  <option value="0.661062">British Pound Sterling</option>
  <option value="0.774538">Euro</option>
</select>
```

## ExchangeRates – 2
Code behind and tests
  * app.js – application code
  * ng-app=”app”
  * ng-controller=”AppController”
  * injecting $scope
  * ng-options – label is currency.name, value is currency
  * test calcCurrency() independently from view
    * load “app” module
    * instantiate controller
    * mock up scope values


```
angular.module('app', []).controller('AppController', function($scope) {

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
```
 
## ExchangeRates – 3
HTTP requests and testing asynch methods
  * injecting $http and numberFilter
  * using promises ($q)
  * using filter in controller
  * mocking $httpBackend requests
    * expectGET() & respond()
    * flush()
    * verify…


```
.controller('AppController', function($scope, $http, numberFilter) {
```

```
$http.get(openExchangeRatesUrl + 'currencies.json' + apiKey).then(function(response) {
  $scope.currencyNames = response.data;
});
```

```
$scope.getCurrencyLabel = function(code, value) {
  return $scope.currencyNames[code] + " (" + numberFilter(value, 2) + " / USD)";
};
```

## ExchangeRates – 4
  * constants
  * creating services via factory()
  * waiting for both promises - $q.all()
  * testing service independently of controller
  * mocking service in controller tests


```
.factory('getRateInfo', [
  // Injection annotation to cope with minification changing parameter names
  'apiKey', 'openExchangeRatesUrl', '$http',
    function(apiKey, openExchangeRatesUrl, $http) {
      return function(type) {
        return $http.get(openExchangeRatesUrl + type + '.json' + apiKey).then(function (response) {
          return response.data;
        });
      };
}])
```

```
$q.all([namesPromise, ratesPromise]).then(function(responses) {
  $scope.currencyNames = responses[0];
  $scope.currencyValues = responses[1].rates;
});
```

## ExchangeRates – 5
Custom directives and better structure
  * module dependencies
  * providers and config blocks (getRateInfoProvider)
  * custom decimal-places directive
  * AngularUI bootstrap – typeahead directive
  * restructure data for typeahead directive
  * two way currency conversion

```
<input
  typeahead="currency as currency.label for currency in currencies | filter : $viewValue"
  ng-model="from.currency"
  placeholder="Please Enter a Currency..."
  class="input-xlarge">
```
