angular.module('SimpleNotes')
	.directive('fab',function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$($element).mouseenter(function(){
					$scope.showTooltips($element);
				});

				$($element).mouseleave(function(){
					$scope.hideTooltips($element);
				});

				$($element).on('click', function(){
					var menuactive = $scope.toggleActive();
					//console.log(this);
					//console.log(menuactive);
					if(menuactive == "false"){
						$scope.hideTooltips($element);
						$element.closeFAB();
					}
					else{
						$scope.showTooltips($element);
						$element.openFAB();
					}
					//this.openFAB();

				});

			},
			controller: function($scope, $element, $attrs){
				$scope.toggleActive = function(){
					var menuActive = $attrs.menuactive;
					//console.log('we are going to toggle', menuActive);
					if(menuActive == 'false'){
						$attrs.menuactive = 'true';
						//$($element).openFAB();
					}
					else{
						$attrs.menuactive = 'false';
						//$($element).closeFAB();
					}
					return menuActive;
				};
				$scope.showTooltips = function(elem){
					$(elem).find('li.tooltipped').each(function(){
						$(this).tooltip('show');
					});
				};
				$scope.hideTooltips = function(elem){
					$(elem).find('li.tooltipped').each(function(){
						////console.log('mouseovering on ', this);
						$(this).tooltip('hide');
					});
				};
			}
		}
	});
