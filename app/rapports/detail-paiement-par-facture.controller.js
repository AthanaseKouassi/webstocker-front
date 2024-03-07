(function () {
    'use strict';

    angular
        .module('app')
        .controller('DetailPaiementParFactureController', DetailPaiementParFactureController);

        DetailPaiementParFactureController.$inject = ['$rootScope','$scope', '$state', '$stateParams','Client','Categorieclient'];

    function DetailPaiementParFactureController($rootScope,$scope, $state, $stateParams,Client,Categorieclient) {
        var vm = this;
//        vm.clients = Client.query();
        vm.categorieClients = Categorieclient.query();
        

    }
})();
