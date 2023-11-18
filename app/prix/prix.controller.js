(function() {
    'use strict';

    angular
        .module('app')
        .controller('PrixController', PrixController);

    PrixController.$inject = ['$scope', '$state', 'Prix', 'PrixSearch'];

    function PrixController ($scope, $state, Prix, PrixSearch) {
        var vm = this;
        vm.prixes = [];
        vm.loadAll = function() {
            Prix.query(function(result) {
                vm.prixes = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PrixSearch.query({query: vm.searchQuery}, function(result) {
                vm.prixes = result;
            });
        };
        vm.loadAll();
        
    }
})();
