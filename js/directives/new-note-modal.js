angular.module('SimpleNotes')
	.directive('newNote', function(){
		return{
			restrict: 'A',
			replace: true,
			priority: 1,
			templateUrl: 'templates/directives/new-note-modal.html',
			link: function($scope, $element, $attrs){

			},
			controller: function($scope){
				console.log('This is when im running');
			}
		};
	});