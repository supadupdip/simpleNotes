angular.module("SimpleNotes")
  .directive('materialtabs', function(){
    return{
      restrict: 'A',
      link: function($scope, $element, $attrs){
        $element.tabs();
      }
    }
  });
