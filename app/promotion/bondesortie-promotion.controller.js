(function () {
    'use strict';

    angular
            .module('app')
            .controller('BonDeSortiePromotionController', BonDeSortiePromotionController)
            .value('URL_USERS', 'api/users/aimas')           
            .value('URL_BS_TROUVER_PROMOTION', 'api/bon-de-sortie-promotion/trouver-par-numero?numeroBon=');

    BonDeSortiePromotionController.$inject = ['$scope', '$state', 'BonDeSortie', 'AlertService', '$stateParams', 'Magasin', 'URL_USERS', 'API_URL', 'FetchData', 'Client', 'Produit', 'LigneBonDeSortie','URL_BS_TROUVER_PROMOTION','PaginationService'];

    function BonDeSortiePromotionController($scope, $state, BonDeSortie, AlertService, $stateParams, Magasin, URL_USERS, API_URL, FetchData, Client, Produit, LigneBonDeSortie, URL_BS_TROUVER_PROMOTION,PaginationService) {

        var vm = this;
        vm.bonDeSorties = BonDeSortie.query();
        vm.magasins = Magasin.query();
        vm.clients = Client.query();
        vm.produits = Produit.query();
        vm.ligneBonDeSortie = LigneBonDeSortie.query();
        vm.bonDeSortie = [];      
        vm.currentPage = 0;
        vm.pageSize = 20;

        vm.loadAllPage = function () {
            FetchData.getData(API_URL + 'api/bon-de-sortie-promotion?page=' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
//            FetchData.getData(API_URL +'api/tout-bon-de-sortie-promotion').then(function (response) {
                console.log(response);
                vm.bonDeSortie = response.data.content;
//                vm.bonDeSortie = response.data;
//                vm.data = vm.bonDeSortie;
//                vm.refresh(null, vm.bonDeSortie, vm);

                vm.totalPage = response.data.totalPages;
                vm.totalElements = response.data.totalElements;
                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
               
            }, function (error) {
                console.log(error);
            });
        };

        vm.setPage = function (p) {
            vm.currentPage = p;
            vm.loadAllPage();
        };

        vm.loadAllPage();

        FetchData.getData(API_URL + URL_USERS).then(function (response) {
            console.log(response);
            vm.userAimas = response.data;
        }, function (error) {
            console.log(error);
        });


        vm.trouverBonDeSortie = function () {
            FetchData.getData(API_URL + 'api/bon-de-sortie-promotion/trouver-par-numero?numeroBon=' + vm.searchQuery + '&page=' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
                console.log(response);
                vm.bonDeSortie = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;
                                
                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
            }, function (error) {
                console.log(error);
            });
        };

        // rafraichir la pagination
        vm.refresh = function (recup, ObjItem, vm) {
            PaginationService.page(recup, ObjItem, vm);
        };

    }
})();

