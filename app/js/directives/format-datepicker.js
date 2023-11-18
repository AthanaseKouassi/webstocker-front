angular.module('app').
  directive('myDate',function(dateFilter,$parse){
  return{
    restrict:'EAC',
    require:'?ngModel',
    link:function(scope,element,attrs,ngModel,ctrl){
      ngModel.$parsers.push(function(viewValue){
        return dateFilter(viewValue,'yyyy-MM-dd');
      });
    }
  }
});

