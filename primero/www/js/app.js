// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var $globalScope;
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).controller('jsonContactos', function($scope, $http, $filter){
  $http.get('/js/datos.json').success(function(data){
    data = $filter('orderBy')(data, function(j){
      return j.name.first;
    });
    $globalScope = $scope;
    $scope.prospectos = data;
  });
}).controller('ctrlContenido', function($scope, $http, $filter) {
  //$scope.items = [1,2,3];
  $scope.doRefresh = function() {
    $http.get('/js/datos2.json').success(function(data) {
      var prospectos = $globalScope.prospectos;

      for (var i = 0; i < data.length; i++){
        prospectos.push(data[i]);
      }

      prospectos = $filter('orderBy')(prospectos, function(j){
      return j.name.first;
      });
      //$scope.items = data;
      $globalScope.prospectos = prospectos;
    }).finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
});