angular.module('SimpleNotes')
	.directive('halloEditor', function(){
		return{
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
					if (!ngModelCtrl) {
							return;
					}

					$element.hallo({
						plugins: {
							'halloformat': {"bold": true, "italic": true, "strikethrough": true, "underline": true},
							'halloheadings': [1,2,3],
							'hallolists':{},
							'hallojustify' : {}
						}
					});

					ngModelCtrl.$render = function() {
							$element.html(ngModelCtrl.$viewValue || '');
					};

					$element.on('hallodeactivated', function() {
							ngModelCtrl.$setViewValue($element.html());
							$scope.$apply();
					});

				}
		}
	});
