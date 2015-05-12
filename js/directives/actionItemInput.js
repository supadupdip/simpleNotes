angular.module('SimpleNotes')
		.directive('actionItemInput',function(){
		return{
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				$element.bind("keyup", function (event){
					if(event.which === 13){
						var newItem = {
							complete: false,
							mentions: ""
						};
						console.log('There was an enter key', $scope.newActionItem);
						console.log($scope);
						newItem.details = $scope.newActionItem;
						$scope.anote.actionItems.push(newItem);
						$scope.newActionItem = null;
						var target = event.target;
						target.focus();
						$scope.$apply();
					}
				});

			}
		}
	});