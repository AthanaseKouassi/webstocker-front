(function () {
    'use strict';

    angular
            .module('app')
            .controller('BonDeSortieTransfertController', BonDeSortieTransfertController)
            .value('URL_USERS', 'api/users/aimas')
            .value('URL_BS_TRANSFERT', 'api/bon-de-sortie-transfert?page=')
            .value('URL_BS_TROUVER_TRANSFERT', 'api/bon-de-sortie-transfert/trouver-par-numero?numeroBon=');

    BonDeSortieTransfertController.$inject = ['$scope', '$state', 'BonDeSortie', 'AlertService', '$stateParams', 'Magasin', 'URL_USERS', 'API_URL', 'FetchData', 'Client', 'Produit', 'LigneBonDeSortie', 'URL_BS_TRANSFERT', 'URL_BS_TROUVER_TRANSFERT'];

    function BonDeSortieTransfertController($scope, $state, BonDeSortie, AlertService, $stateParams, Magasin, URL_USERS, API_URL, FetchData, Client, Produit, LigneBonDeSortie, URL_BS_TRANSFERT, URL_BS_TROUVER_TRANSFERT) {

        var vm = this;
        
        vm.bonDeSorties = BonDeSortie.query();
        vm.magasins = Magasin.query();
        vm.clients = Client.query();
        vm.produits = Produit.query();
        vm.ligneBonDeSortie = LigneBonDeSortie.query();
        vm.bonDeSortie = [];
        vm.currentPage = 0;
        vm.pageSize = 20;
        
        vm.load = function (id) {
            BonDeSortie.get({id: id}, function(result){
                vm.bonDeSortie = result;
                console.log(vm.bonDeSortie);
                console.log("le resultat de la date "+vm.bonDeSortie.daateCreation);
            });
        };
     
        
        vm.loadLigneBonDeSortie = function (id) {
            ligneBonDeSortie.get({id: id}, function(result){
                vm.ligneBonDeSortie = result;
                console.log(vm.ligneBonDeSortie);
                
            });
        };

        vm.loadAllPage = function () {
            FetchData.getData(API_URL + URL_BS_TRANSFERT  + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
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
            FetchData.getData(API_URL + URL_BS_TROUVER_TRANSFERT + vm.searchQuery + '&page=' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
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

         

    }
})();