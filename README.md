# Exchange Rate Application Demo
A simple demo of a currency converter application

## ExchangeRates – 0
Hard coded simplest example

  * angular.js script
  * ng-app
  * ng-model
  * ng-bind ( {{}} )
  * expressions and filters

## ExchangeRates – 1
Styled and currency choice
  * bootstrap CSS
  * select directive with static options

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
 
## ExchangeRates – 3
HTTP requests and testing asynch methods
  * injecting $http and numberFilter
  * using promises ($q)
  * using filter in controller
  * mocking $httpBackend requests
    * expectGET() & respond()
    * flush()
    * verify…

## ExchangeRates – 4
  * constants
  * creating services via factory()
  * waiting for both promises - $q.all()
  * testing service independently of controller
    * mocking service in controller tests

## ExchangeRates – 5
Custom directives and better structure
  * module dependencies
  * providers and config blocks (getRateInfoProvider)
  * custom decimal-places directive
  * AngularUI bootstrap – typeahead directive
  * restructure data for typeahead directive
  * two way currency conversion
