angular.module('SimpleNotesFilters', [])
  .filter('meetingSort', function() {
    return function(selectedSort) {

      if(selectedSort == 'activity'){
        console.log('sort by activity');
        return $scope.meetings;
      }
      //return selectedSort ? '\u2713' : '\u2718';
    };
  });
