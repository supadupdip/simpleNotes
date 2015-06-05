angular.module('SimpleNotes')
	.directive('meetingCardSorts', ['meetingFactory', function(meetingFactory){
		return{
			restrict: 'A',
			template: "<ul id='sortDropdown' class='dropdown-content'>"+
			          "<li data-sort-type='sortOption' ng-repeat='sortOption in sortTypes'><a href='#!' no-link title='{{sortOption.tooltip}}' ng-click='makeActive(sortOption)'><i class='{{sortOption.icon}}'></i></a></li>"+
			        "</ul>",
			scope:{
				sortType : '='
			},
			//require: '^MeetingsIndexController',
			link: function($scope, $element, $attrs){
				console.log($scope.$parent);
				$scope.sortTypes = new meetingFactory.indexSortCategories();
				console.log('logging sort types from directive',$scope.sortTypes);

				$scope.categoryActive = function(){
					return $scope.$parent.getActiveSort() === $scope.sortType;
				};

				$scope.makeActive = function(sortType){
					console.log('trying to make this sort active');
					$scope.$parent.setActiveSort(sortType);
				};
			}
		}
	}]);
