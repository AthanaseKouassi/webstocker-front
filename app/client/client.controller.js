(function () {
    'use strict';

    angular
            .module('app')
            .controller('ClientController', ClientController)
            .value('URL_TROUVER_UN_CLIENT', 'api/retrouver-clients?nomClient=')
            .value('URL_TOUS_LES_CLIENTS', 'api/tous-les-clients?page=');

    ClientController.$inject = ['$scope', '$state', 'Client', 'ClientSearch', 'API_URL', 'URL_TROUVER_UN_CLIENT', 'FetchData', 'URL_TOUS_LES_CLIENTS', '$http'];

    function ClientController($scope, $state, Client, ClientSearch, API_URL, URL_TROUVER_UN_CLIENT, FetchData, URL_TOUS_LES_CLIENTS, $http) {
        var vm = this;
        vm.clients = [];
        vm.currentPage = 0;
        vm.pageSize = 20;
        //vm.numberOfPage = 0;


        vm.loadAll = function () {
            $http.get(API_URL + URL_TOUS_LES_CLIENTS + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
                console.log(response);
                vm.clients = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;

                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
            }, function (error) {
                console.log(error);
            });
        };


        vm.trouverClient = function () {
            var nomclient = vm.searchQuery;
            if (!nomclient) {
                return vm.loadAll();
            }
            FetchData.getData(API_URL + URL_TROUVER_UN_CLIENT + nomclient + '&page=' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
                vm.clients = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;

                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
                console.log('LA RECHERCHE ' + vm.clients);
            }, function (error) {
                console.log(error);
            });
        };


        vm.setPage = function (p) {
            vm.currentPage = p;
            vm.loadAll();
        };

        vm.loadAll();
        
//        vm.loadAll = function () {
//            Client.query(function (result) {
//                vm.clients = result;
//            });
//        };


//        //rechercher un clients par son nom
//        vm.trouverClient = function () {
//            var nomclient = vm.searchQuery;
//            if (!nomclient) {
//               return vm.loadAll();
//            }
//            FetchData.getData(API_URL + URL_TROUVER_UN_CLIENT + nomclient)
//                    .then(function (result) {
//                        console.log(result);
//                        vm.clients = result.data;
//                    }, function (error) {
//                        console.log(error);
//                    });
//        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ClientSearch.query({query: vm.searchQuery}, function (result) {
                vm.clients = result;
            });
        };
        vm.loadAll();


    }
})();
