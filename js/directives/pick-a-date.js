angular.module("SimpleNotes")
.directive('pickADate', function(){
  return{
    restrict: 'EA',
    require: 'ngModel',
    link: function($scope, $element, $attrs, ngModelCtrl){
      //Parser used when the data is traveling back to the model

      //Formatter used when the data is traveling from the model to the view

      thisController = this;
      //initialize control
      var parser = function(date){
          //debugger ;
          //console.log('running when date is set', date);

          if(jsonDate instanceof Date){
            var jsonDate = date.toJSON();
            return jsonDate;
          }
          else{
            return date;
          }

      };
      ngModelCtrl.$parsers.push(parser);

      var formatter = function(date){
        var thisdate = new Date(date);
        return thisdate;

      };
      ngModelCtrl.$formatters.push(formatter);
      $element.pickadate({
        format: 'mm/dd/yyyy',
        closeOnSelect: true,
        closeOnClear: true
      });

    }
  }

});
