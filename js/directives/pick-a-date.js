angular.module("SimpleNotes")
.directive('pickADate', function(){
  return{
    restrict: 'EA',
    require: 'ngModel',
    link: function($scope, $element, $attrs, ngModelCtrl){
      //Parser used when the data is traveling back to the model

      //Formatter used when the data is traveling from the model to the view
      console.log(ngModelCtrl);
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
        format: 'mmm dd yyyy',
        closeOnSelect: true
      });
      /*format: 'ddd mmm dd yyyy',
      hiddenName: false,
      hiddenPrefix: 'hidedate__',

      onRender: function(){
        var DateString = function(date){
          console.log(date);
          return date;
        }
        ngModelCtrl.$formatters.push(DateString);
      },
      onSet: function(context){
        console.log('We are setting the datepicker control', context);
        var currentValue = $element.val();
        console.log(currentValue);
        var rawDate = $("[name='startdate']").val();
        var newDate = new Date(rawDate);
        console.log(newDate);

        var ISOConversion = function(date){
          console.log('Date before ISO conversion', date);
          return date.toISOString();
        }
        ngModelCtrl.$parsers.push(ISOConversion);

        ngModelCtrl.$setViewValue(newDate);
        $scope.$digest();
        //2015-03-15T21:03:08.241Z

        /* Old way we were trying to set view value
        $scope.$apply(function(){
          ngModelCtrl.$setViewValue(currentValue);
        });
        $element.val(currentValue);*/

    }
  }

});
