(function () {
    'use strict';

    angular
            .module('app')
            .controller('PaginationController', PaginationController);

    PaginationController.$inject = ['$rootScope', '$state','$scope'];
    
    function PaginationController($rootScope, $state,$scope) {
        var vm = this;
       
    }
})();
