angular.module('SimpleNotes')
	.directive('editableActionItem',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$element.bind("mouseenter", function (event){
					$element.find('.removeActionItem').removeClass('hide');
				});
				$element.bind("mouseleave", function (event){
					$element.find('.removeActionItem').addClass('hide');
				});
			},
			controller: function($scope){
				//console.log('Logging from within editable aciton item');

				$scope.removeActionItem = function(actionItem){
					//console.log('We are trying to remove an action item');
					//console.log(actionItem);
					//console.log($scope);
					var index = $scope.$parent.anote.actionItems.indexOf(actionItem);
					$scope.$parent.anote.actionItems.splice(index, 1);
				};

				$scope.toggleComplete = function(actionItem){
					if(actionItem.complete){
						//Set it as incomplete
						actionItem.complete = false;
					}
					else{
						//Set action item as complete
						actionItem.complete = true;
					}
				}
			}
		}
	});