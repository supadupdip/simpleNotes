angular.module('SimpleNotes')
	.directive('jsondate', function(){
		return{
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				 var parser = function(date){

					 if((date instanceof Date)){
					 	console.log('running when date is set', date);
					 	var jsonDate = date.toJSON();
					 	return jsonDate;
				 	}
				 }
				 ngModelCtrl.$parsers.push(parser);


				 var formatter = function(date){

				 	var thisdate = new Date(date);
				 	return thisdate;
				 
				 }
				 ngModelCtrl.$formatters.push(formatter);

				 /*
				 $element.on('change', function(){
				 		var currentValue = $element.val();
				 		ngModelCtrl.$setViewValue(currentValue);
						$scope.$digest();

				 });*/

			}
		}
	});