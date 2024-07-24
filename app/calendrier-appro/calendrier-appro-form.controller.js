(function() {
    'use strict';

    angular
        .module('app')
        .controller('CalendrierApproControllerForm', CalendrierApproControllerForm);
 /*'Lignefacture', 'LignefactureSearch'*/
 CalendrierApproControllerForm.$inject = ['$scope', '$state', 'FetchData', 'API_URL', '$stateParams', 'AuthServerProvider'];

        /*Lignefacture, LignefactureSearch*/
    function CalendrierApproControllerForm ($scope, $state, FetchData, API_URL, $stateParams, AuthServerProvider) {

        var vm = this;
        vm.inventaire = {};
        vm.produits = [];
        vm.produit = {};
        vm.bailleurs = [];
        vm.bailleur = {};
        vm.id = $stateParams.id;
        vm.dateDebut = "";
        var authToken = AuthServerProvider.getToken();
        vm.loadAll = function() {
   
            
            FetchData.getData(API_URL + 'api/produits')
            .then(function (response) {
                // console.log(response);
                vm.produits = response.data;
                // vm.totalElements = response.data.totalElements;
                // vm.totalPage = response.data.totalPages;

                // console.log('nombre d\'élément ' + vm.totalElements);
                // console.log('nombre de page ' + vm.totalPage);
                // console.log("OUUHHH "+vm.inventaires);
            }, function (error) {
                console.log(error);
            });

            FetchData.getData(API_URL + 'api/bailleurs')
            .then(function (response) {
                vm.bailleurs = response.data;
            }, function (error) {
                console.log(error);
            });

            
            if (vm.id)
                FetchData.getData(API_URL + 'api/inventaires/' + vm.id)
                .then(function (response) {
                    vm.inventaire = response.data;
                    vm.bailleur = vm.inventaire.bailleur;
                    vm.produit = vm.inventaire.produit;

                    vm.changeProduit();
                }, function (error) {
                    console.log(error);
                });

        };


        vm.changeProduit = function () {
            FetchData.getData(API_URL + 'api/inventaire/'+vm.produit.nomProduit+'/quantite-theorique-en-stock?dateInventaire='+vm.inventaire.dateInventaire)
            .then(function (response) {
                vm.produits = response.data;
            }, function (error) {
                console.log(error);
            });
        }

        vm.exportExcel = function () {
            var url = API_URL + 'api/report/inventaires/calendrier-approvisionnement/'+vm.inventaire.dateInventaire /* + '?access_token=' + authToken*/;
            window.open(url);
        }

        vm.exportPDF = function () {
            var url = API_URL + 'api/report/inventaires/calendrier-approvisionnement/'+vm.inventaire.dateInventaire/* + '?access_token=' + authToken*/;
            window.open(url);
        }

        // vm.lignefactures = [];
        // vm.loadAll = function() {
        //     Lignefacture.query(function(result) {
        //         vm.lignefactures = result;
        //     });
        // };

        // vm.search = function () {
        //     if (!vm.searchQuery) {
        //         return vm.loadAll();
        //     }
        //     LignefactureSearch.query({query: vm.searchQuery}, function(result) {
        //         vm.lignefactures = result;
        //     });
        // };
        vm.loadAll();



        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebut = false;
    
        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
        
    }


})();
