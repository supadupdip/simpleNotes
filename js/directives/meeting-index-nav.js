angular.module('SimpleNotes')
	.directive('meetingIndexNav',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$scope.searchActive = false;
			},
			controller: function($scope, $element, $attrs){
				$scope.Cancel = function(){
					var searchValue = $element.find('#meetingFilter').val();
					if(searchValue){
						//we're just goint to reset the field
						$element.find('#meetingFilter').val('');
						$scope.page.searchText = '';
					}
					else{
						//this means that there is no value and we should hide the search bar
						$scope.searchActive = false;
					}
				}

				$scope.showSearch = function(){
					$scope.searchActive = true;
				}
			}
		}
	});