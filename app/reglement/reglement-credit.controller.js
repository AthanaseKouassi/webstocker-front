(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReglementCreditController', ReglementCreditController);

    ReglementCreditController.$inject = ['$scope', '$state', 'Produit', 'Client','Facture'];

    function ReglementCreditController ($scope, $state, Produit, Client,Facture) {
        var vm = this;
        vm.produits = [];
        vm.factures=[];
        vm.clients=[];

        vm.loadClients=function () {
            Client.query(function (result) {
                vm.clients=result;
            });
        };


        vm.loadAll = function() {
            Facture.getAllFacturesCustom(function(result) {
                vm.factures = result;
            });
        };

        vm.loadFacturesClient=function (value) {
            console.log(value);
        };

        vm.loadAll();
        
    }
})();
