(function() {
    'use strict';

    angular
        .module('app')
        .factory('BudgetSearch', BudgetSearch);

    BudgetSearch.$inject = ['$resource','API_URL'];

    function BudgetSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/budgets/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/budgets/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/budgets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
