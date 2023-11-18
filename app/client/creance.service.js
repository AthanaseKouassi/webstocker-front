(function() {
    'use strict';
    angular
        .module('app')
        .factory('Creance', Creance);

    Creance.$inject = ['$http'];

    function Creance ($http) {
       return{
           getData : function(url){
               return $http.get(url);
           },
           postJSON : function(url,data){
               return $http.post(url,data);
           }
       };
    }
})();
