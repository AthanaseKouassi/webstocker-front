(function() {
    'use strict';
    angular
        .module('app')
        .factory('FetchData', FetchData);

    FetchData.$inject = ['$http'];

    function FetchData ($http) {
       return{
           getData : function(url){
               return $http.get(url);
           },
           postJSON : function(url,data){
               return $http.post(url,data);
        },
           postForm: function (url, datas) {
            return $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: datas
            });
        }
       }
       };
    }
)();
