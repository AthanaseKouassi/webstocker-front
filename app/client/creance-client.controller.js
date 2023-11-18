(function() {
    'use strict';

    angular
        .module('app')
        .value('URL_CREANCES','api/creances')
//        .value('URL_CREANCES','http://83.166.138.228:8080/api/creances')
//        .value('URL_CREANCES','http://localhost:8080/api/creances')
        .controller('CreanceClientController', CreanceClientController);

    CreanceClientController.$inject = ['$scope','$http', '$state', 'Produit', 'ProduitSearch','FetchData','URL_CREANCES','API_URL'];

    function CreanceClientController ($scope,$http, $state, Produit, ProduitSearch,FetchData,URL_CREANCES,API_URL) {
        var vm = this;
        vm.produits = [];
        //$scope.critere = 0'';
        $scope.creances = [];
        vm.loadAll = function() {
            Produit.query(function(result) {
                vm.produits = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ProduitSearch.query({query: vm.searchQuery}, function(result) {
                vm.produits = result;
            });
        };
        vm.loadAll();
        
        $scope.getCreancesByCriteria = function(val){
            if(parseInt(val)===0){
                alert('Faites un choix');
                return;
            }
            FetchData.getData(API_URL+URL_CREANCES+'?critere='+val).then(
                    function(result){
                        console.log(result);
                        $scope.creances = result.data;
                    },function(error){
                        alert('Erreur de connexion');
                  });
            };
    }
})();
