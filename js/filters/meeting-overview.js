angular.module('SimpleNotesFilters', [])
  .filter('meetingSort',[ '$scope',function($scope) {
    return function(selectedSort) {

      if($scope.activeSort == 'activity'){
        console.log('sort by activity');
        return $scope.meetings ;
      }
      //return selectedSort ? '\u2713' : '\u2718';
    };
  }]);
