// Bootstrap the app and controllers
angular.module('toDoApp', [
  'toDoApp.toDoList',
  'ui.router',
  'ngMaterial',
  'ngStorage',
  'monospaced.elastic'
])

// config the app states
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('toDoList', {
      url: '/',
      templateUrl: 'app/todoList/toDoList.html',
      controller: 'toDoListCtrl'
    });
    $urlRouterProvider.otherwise('/');
});
