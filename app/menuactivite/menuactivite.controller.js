(function() {
    'use strict';

    angular
        .module('app')
        .controller('MenuactiviteController', MenuactiviteController);

    MenuactiviteController.$inject = ['$scope', '$state', 'Commande', 'CommandeSearch'];

    function MenuactiviteController ($scope, $state, Commande, CommandeSearch) {
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
