angular.module('toDoApp.toDoList', [])

.controller('toDoListCtrl', function ($scope, $rootScope, $state, $localStorage, $timeout) {

  // Initializes the tasks localstorage variable to store an empty task object if the variable is undefined. The scope variable is then updated to be equivalent to the localstorage variable.
  $localStorage.toDoTasksStored = $localStorage.toDoTasksStored || [
    {
      text: '',
      ifChecked: false,
      ifShowTask: {"display":"block"}
    }
  ];
  $scope.toDoTasks = $localStorage.toDoTasksStored;

  // Initializes the toggleItemViewText variable to be "Show" if the variable is undefined. "Show" indicates that the user is in default view state where all completed tasks are hidden
  $scope.toggleItemViewText = $scope.toggleItemViewText || "Show";

  // This function will hide or show the completed tasks depending on the value saved in the $scope variable 'toggleItemViewText'. This is done by changing the 'display' attribute on each containing div for the task
  $scope.toggleItemView = function() {
    if($scope.toggleItemViewText === "Show") {
      for (i = 0 ; i < $localStorage.toDoTasksStored.length; i++) {
        $localStorage.toDoTasksStored[i].ifShowTask = {'display':'block'};
      }
      $scope.toggleItemViewText = 'Hide';
    } else {
      for (i = 0 ; i < $localStorage.toDoTasksStored.length; i++) {
        if($localStorage.toDoTasksStored[i].ifChecked) {
          $localStorage.toDoTasksStored[i].ifShowTask = {'display':'none'};
        }
      }
      $scope.toggleItemViewText = 'Show';
    }
    $scope.toDoTasks = $localStorage.toDoTasksStored;
  }

  // When user checks the checkbox next to a task, this function is invoked and the index of the clicked task is passed as a parameter so that the 'display' attribute of the current task can be changed to none to hide the current task from view. 
  $scope.completedTask = function(index) {
    // If the toggleItemViewText is "Show", then that means all the completed tasks are hidden and we want to hide the task associated with the index argument
    if($scope.toggleItemViewText === "Show") {
      $timeout(function() {
        if($localStorage.toDoTasksStored[index].ifChecked && $localStorage.toDoTasksStored[index].text !== '') {
          $localStorage.toDoTasksStored[index].ifShowTask = {'display': 'none'}
          $scope.$apply(function() {
            $scope.toDoTasks = $localStorage.toDoTasksStored;
          }); 
        }
      }, 1000);
    }
  };


  $(document).ready(function(){

    // Listens to events on document because jquery handlers are bound at runtime so ng-repeat items are not accounted for
    $(document).on('keydown', function() {
      // Appends an new empty task field when user is adding a task in the last row, so user can add another new task when they've finished adding current task
      $('textarea').keydown(function() {
        if($localStorage.toDoTasksStored[$localStorage.toDoTasksStored.length-1].text !== '') {
          $localStorage.toDoTasksStored.push({text: '', ifChecked: false})
        }
        $scope.$apply(function() {
          $scope.toDoTasks = $localStorage.toDoTasksStored;
        });
        return;
      });

      // Checks if there are any empty tasks (which isn't the last task), and removes the empty tasks from storage. 
      $('textarea').blur(function() {
        for (var i = 0 ;i < $localStorage.toDoTasksStored.length-1; i++) {
          if($localStorage.toDoTasksStored[i].text === '') {
            $localStorage.toDoTasksStored.splice(i,1);
          }
        }
        $scope.$apply(function() {
          $scope.toDoTasks = $localStorage.toDoTasksStored;
        });
      });
    });
  });
});

//leave empty line
