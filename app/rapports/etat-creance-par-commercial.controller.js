(function () {
    'use strict';

    angular
        .module('app')
        .controller('EtatCreanceParCommercial', EtatCreanceParCommercial);

        EtatCreanceParCommercial.$inject = ['$rootScope','$scope', '$state', '$stateParams','Client','Categorieclient'];

    function EtatCreanceParCommercial($rootScope,$scope, $state, $stateParams,Client,Categorieclient) {
        var vm = this;
//        vm.clients = Client.query();
        vm.categorieClients = Categorieclient.query();
        

    }
})();
