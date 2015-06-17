angular.module('SimpleNotes')
	.directive('modalTrigger', function(){
		return{
			restrict: 'A',
			link: function($scope, $element, $attrs){
				$($element).on('click', function(){
					var modalName = $attrs.modalTrigger;
					modalName = '#'+modalName;
					$(modalName).openModal();
				});
			}
		}
	});
