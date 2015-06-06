angular.module('SimpleNotes')
	.directive('meetingCardSorts', ['meetingFactory', function(meetingFactory){
		return{
			restrict: 'A',
			//require: '^MeetingsIndexController',
			link: function($scope, $element, $attrs){
				$scope.sortTypes = new meetingFactory.indexSortCategories();

				$scope.makeActive = function(sortType){
					$scope.setActiveSort(sortType);
				};
			}
		}
	}]);
