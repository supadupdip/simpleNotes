angular.module('SimpleNotes')
	.directive('hallo', function(){
		return{
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				 //console.log($element);
				 $element.hallo({
				 	plugins:{
				 		'halloformat':{},
				 		'halloblock':{},
				 		'hallojustify':{},
				 		'hallolists':{},
				 		'halloreundo':{}
				 	}
				 });
				//console.log($element);
				 ngModelCtrl.$render = function(){
				 	var contents = ngModelCtrl.$viewValue;
				 	$element.hallo('setContents', contents)
				 };

				 $element.on('hallomodified', function(){
				 	var contents = $element.hallo('getContents');
				 	ngModelCtrl.$setViewValue(contents);
				 	$scope.$digest();
				 });

				 var converter = new Showdown.converter();
				 var formatter = function(markdown){
				 	return converter.makeHtml(markdown);
				 }

				 ngModelCtrl.$formatters.push(formatter);

				 var parser = function(html){
				 	return toMarkdown(html);
				 }

				 ngModelCtrl.$parsers.push(parser);


			}
		}
	});