(function() {
    'use strict';

    angular
        .module('app')
        .controller('MenuachatController', MenuachatController);

    MenuachatController.$inject = ['$scope', '$state', 'Commande', 'CommandeSearch'];

    function MenuachatController ($scope, $state, Commande, CommandeSearch) {
        var vm = this;
        vm.commandes = [];
        vm.loadAll = function() {
            Commande.query(function(result) {
                vm.commandes = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CommandeSearch.query({query: vm.searchQuery}, function(result) {
                vm.commandes = result;
            });
        };
        vm.loadAll();
        
    }
})();
