(function() {
    'use strict';

    angular
        .module('app')
        .factory('CategorieclientSearch', CategorieclientSearch);

    CategorieclientSearch.$inject = ['$resource','API_URL'];

    function CategorieclientSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/categorieclients/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/categorieclients/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/categorieclients/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
