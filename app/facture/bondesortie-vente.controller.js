(function () {
    'use strict';

    angular
            .module('app')
            .controller('BonDeSortieVenteController', BonDeSortieVenteController)
            .value('URL_USERS', 'api/users/aimas')
            .value('URL_BS_VENTE', 'api/bon-de-sortie-vente?page=')
            .value('URL_BS_VENTE_TROUVER', 'api/bon-de-sortie-vente/trouver-par-numero?numeroBon=');

    BonDeSortieVenteController.$inject = ['$rootScope','$scope', '$state', 'BonDeSortie', 'AlertService', '$stateParams', 'Magasin', 'URL_USERS', 'API_URL', 'FetchData', 'Client', 'Produit', 'LigneBonDeSortie', 'URL_BS_VENTE', 'URL_BS_VENTE_TROUVER'];

    function BonDeSortieVenteController($rootScope,$scope, $state, BonDeSortie, AlertService, $stateParams, Magasin, URL_USERS, API_URL, FetchData, Client, Produit, LigneBonDeSortie, URL_BS_VENTE, URL_BS_VENTE_TROUVER) {

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
            FetchData.getData(API_URL + URL_BS_VENTE + '' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
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
            FetchData.getData(API_URL + URL_BS_VENTE_TROUVER + vm.searchQuery + '&page=' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
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
        $rootScope.btnModif = 'y'

    }
})();
