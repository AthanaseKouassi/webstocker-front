(function () {
    'use strict';

    angular
            .module('app')
            .controller('ListeBodereauLivraisonController', ListeBodereauLivraisonController)
            .value('URL_GET_BON', 'api/bon-de-livraisons?page=')
            .value('URL_GET_BON_BY_NUMBER', 'api/bon-de-livraisons-numero?numeroBon=');

    ListeBodereauLivraisonController.$inject = ['$rootScope', '$scope', 'API_URL', '$http', 'URL_GET_BON', '$state', 'Livraison', 'FetchData', 'URL_GET_BON_BY_NUMBER', 'ListeBordereauService'];

    function ListeBodereauLivraisonController($rootScope, $scope, API_URL, $http, URL_GET_BON, $state, Livraison, FetchData, URL_GET_BON_BY_NUMBER, ListeBordereauService) {

        var vm = this;
        vm.livraisons = [];
        $scope.bonDeLivraisons = [];
        vm.criteria = {};
        vm.pdfContent = null;

        vm.currentPage = 0;
        vm.pageSize = 20;
        vm.numberOfPage = 0;


//        vm.loadAll = function() {
//            Livraison.query(function(result) {
//                vm.livraisons = result;
//                console.log('les livraisons');
//                console.log(vm.livraisons);
//            });
//        };

//        vm.search = function () {
//            if (!vm.searchQuery) {
//                return vm.loadAll();
//            }
//            LivraisonSearch.query({query: vm.searchQuery}, function(result) {
//                vm.livraisons = result;
//            });
//        };

        vm.afficherBordereauLivraison = function (valeur) {
            console.log('Impression de Bordereau de livraison***');
            vm.pdfContent = API_URL + 'api/report/lignelivraisons/bordereaulivraison/valeur';
            $rootScope.bordereauLivraisonUrl = API_URL + 'api/report/lignelivraisons/bordereaulivraison/' + valeur;
            console.log('url finale ' + $rootScope.bordereauLivraisonUrl);
            $state.go('liste-bordereau-pdf');
        };

        vm.afficherBonDeSortie = function (valeur) {
            console.log("************************************************************");
            console.log('Impression de Bon de sortie N° ' + valeur);
            console.log("************************************************************");
            vm.pdfContent = API_URL + 'api/report/bondesorties/toutbondesortie/valeur';
            $rootScope.bonDesortieUrl = API_URL + 'api/report/bondesorties/toutbondesortie/' + valeur;
            console.log('url finale ' + $rootScope.bonDesortieUrl);
            $state.go('liste-bon-de-sortie');
        };


        vm.loadAll = function () {
            $http.get(API_URL + URL_GET_BON + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
                console.log('bon de livraison :' + response);
                console.log(response);
                $scope.bonDeLivraisons = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;
                
                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
            }, function (error) {
                console.log(error);
            });
        };

        vm.setPage = function (p) {
            vm.currentPage = p;
            vm.loadAll();
            vm.loadData();
        };




        vm.loadData = function () {
            console.log(vm.criteria.noBonDeSortie);
            FetchData.getData(API_URL + URL_GET_BON_BY_NUMBER + vm.criteria.noBonDeSortie+'&page='+vm.currentPage+'&size='+vm.pageSize).then(function (response) {
                $scope.bonDeLivraisons = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;
                
                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
                console.log('LA RECHERCHE ' + $scope.bonDeLivraisons);
            }, function (error) {
                console.log(error);
            });
        };
        vm.loadAll();
    }
})();
