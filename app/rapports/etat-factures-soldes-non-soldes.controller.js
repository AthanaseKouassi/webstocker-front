(function () {
    'use strict';

    angular
        .module('app')
        .controller('EtatFacturesSoldesNonSoldes', EtatFacturesSoldesNonSoldes);

        EtatFacturesSoldesNonSoldes.$inject = ['$rootScope','$scope', '$state', '$stateParams','Client','Categorieclient'];

    function EtatFacturesSoldesNonSoldes($rootScope,$scope, $state, $stateParams,Client,Categorieclient) {
        var vm = this;
//        vm.clients = Client.query();
        vm.categorieClients = Categorieclient.query();
        

    }
})();
