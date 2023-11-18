(function() {
    'use strict';

    angular
        .module('app')
        .factory('LigneBudgetSearch', LigneBudgetSearch);

    LigneBudgetSearch.$inject = ['$resource','API_URL'];

    function LigneBudgetSearch($resource, API_URL) {
        var resourceUrl =  API_URL+'api/_search/ligne-budgets/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/ligne-budgets/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/ligne-budgets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
