(function () {
    'use strict';

    angular
            .module('app')
            .controller('LivraisonController', LivraisonController);

    LivraisonController.$inject = ['$rootScope','$scope', '$state', 'Livraison', 'LivraisonSearch','API_URL'];

    function LivraisonController($rootScope,$scope, $state, Livraison, LivraisonSearch,API_URL) {
        var vm = this;
        vm.livraisons = [];
        vm.loadAll = function () {
            Livraison.query(function (result) {
                vm.livraisons = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            LivraisonSearch.query({query: vm.searchQuery}, function (result) {
                vm.livraisons = result;
            });
        };
        vm.loadAll();

        vm.imprimeLivraison = function (livraison) {
            $rootScope.livraisonUrl = API_URL+'api/report/lignelivraisons/bordereauReception/' + livraison;
            
//            $rootScope.livraisonUrl = 'http://83.166.138.228:8080/api/report/lignelivraisons/bordereauReception/' + livraison;
//            $rootScope.livraisonUrl = 'http://localhost:8080/api/report/lignelivraisons/bordereauReception/' + livraison;

            console.log("url du pdf ok");
            console.log($rootScope.livraisonUrl);
            //$state.go("livraison");
            $state.go("reception-livraison-report");
        };

    }
})();
