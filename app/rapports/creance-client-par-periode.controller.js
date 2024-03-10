(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreanceClientParPeriode', CreanceClientParPeriode);

        CreanceClientParPeriode.$inject = ['$rootScope','$scope', '$state', '$stateParams','Client','Categorieclient'];

    function CreanceClientParPeriode($rootScope,$scope, $state, $stateParams,Client,Categorieclient) {
        var vm = this;
//        vm.clients = Client.query();
        vm.categorieClients = Categorieclient.query();
        

    }
})();
