(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListeClientsCommercial', ListeClientsCommercial);

        ListeClientsCommercial.$inject = ['$rootScope','$scope', '$state', '$stateParams','Client','Categorieclient'];

    function ListeClientsCommercial($rootScope,$scope, $state, $stateParams,Client,Categorieclient) {
        var vm = this;
//        vm.clients = Client.query();
        vm.categorieClients = Categorieclient.query();
        

    }
})();
