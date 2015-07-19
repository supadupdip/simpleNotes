angular.module('SimpleNotes')
	.directive('jsondate', function(){
		return{
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl){
				 var parser = function(date){
					 	//debugger ;
					 	////console.log('running when date is set', date);
					 	
					 	if(jsonDate instanceof Date){
						 	var jsonDate = date.toJSON();
						 	return jsonDate;	
					 	}
					 	else{
					 		return date;
					 	}
					 	
				 }
				 ngModelCtrl.$parsers.push(parser);

				 var formatter = function(date){

				 	var thisdate = new Date(date);
				 	return thisdate;
				 
				 }
				 ngModelCtrl.$formatters.push(formatter);

			}
		}
	});