(function () {
    'use strict';

    angular
            .module('app')
            .controller('TresorerieController', TresorerieController);

    TresorerieController.$inject = ['$scope', '$state', '$filter', 'AlertService', '$stateParams', 'API_URL', 'FetchData','BonDeSortie', 'ParseLinks'];

    function TresorerieController($scope, $state,$filter,AlertService, $stateParams, API_URL, FetchData,BonDeSortie, ParseLinks) {
        var vm = this;
         vm.bonDeSorties = {}; //BonDeSortie.query();
         vm.bonDeSortie = [];
         vm.factures = [];

        vm.currentPage = 0;
        vm.pageSize = 2;
        vm.typeRecherche = 'bynum';

        vm.datePickerOpenStatus = {};

        vm.dateDebut = "";
        vm.dateFin = "";

        vm.load = function (id) {
            BonDeSortie.get({id: id}, function (result) {
                vm.bonDeSortie = result;
                console.log(vm.bonDeSortie);
                console.log("le resultat de la date " + vm.bonDeSortie.daateCreation);
            });
        };
        vm.loadAllPage = function () {
            FetchData.getData(API_URL + 'api/bon-de-sortie-transfert/transfert-encours?page=' + vm.currentPage + '&size=' + vm.pageSize)
                    .then(function (response) {
                        console.log(response);
                        vm.bonDeSortie = response.data.content;
                        vm.totalElements = response.data.totalElements;
                        vm.totalPage = response.data.totalPages;

                        console.log('nombre d\'élément ' + vm.totalElements);
                        console.log('nombre de page ' + vm.totalPage);
                        console.log("OUUHHH "+vm.bonDeSortie.numero);
                    }, function (error) {
                        console.log(error);
                    });
        };

        vm.setPage = function (p) {
            vm.currentPage = p;
            // vm.loadAllPage();
            vm.loadAllFacturesByPeriode();
        };

        // vm.loadAllPage();

//        $scope.datePickerOpenStatus = {};
//        $scope.datePickerOpenStatus.dateReception = false;
//
        vm.openCalendar = function (date) {
           vm.datePickerOpenStatus[date] = true;
       };


            // vm.loadAllPage = function () {
            //     FetchData.getData(API_URL + 'api/bon-de-sortie-transfert/transfert-encours?page=' + vm.currentPage + '&size=' + vm.pageSize)
            //         .then(function (response) {
            //             console.log(response);
            //             vm.bonDeSortie = response.data.content;
            //             vm.totalElements = response.data.totalElements;
            //             vm.totalPage = response.data.totalPages;

            //             console.log('nombre d\'élément ' + vm.totalElements);
            //             console.log('nombre de page ' + vm.totalPage);
            //             console.log("OUUHHH "+vm.bonDeSortie.numero);
            //         }, function (error) {
            //             console.log(error);
            //         });
            // };

            vm.totalPage = 0;
            vm.loadAllFacturesByPeriode = function () {
                var dateDebut, dateFin = null;
                if(vm.dateDebut!==null){
                    dateDebut = $filter('date')(vm.dateDebut, 'yyyy-MM-dd');
                }
                if(vm.dateFin!==null){
                    dateFin = $filter('date')(vm.dateFin, 'yyyy-MM-dd');
                }
                if (dateDebut && dateFin)
                    // FetchData.getData(API_URL + 'api/facture/factures-non-solde/?dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                    FetchData.getData(API_URL + 'api/facture/factures-non-solde-page/?dateDebut=' + dateDebut + '&dateFin=' + dateFin + '&page=' + vm.currentPage + '&size=' + vm.pageSize)
                    .then(function (response, a, b) {
                        console.log('RESPONSE:::: ', response, response.headers, response.headers());
                        vm.factures = response.data;
                        // vm.onSuccess(response.getAllResponseHeaders());
                        // vm.totalElements = response.data.totalElements;
                        // vm.totalPage = response.data.totalPages;
                        vm.totalPage = response.headers('X-Total-Count');

                        console.log('nombre d\'élément @@@ ' + vm.totalElements);
                        console.log('nombre de page @@@ ' + vm.totalPage);
                        // console.log("OUUHHH "+vm.bonDeSortie.numero);
                    }, function (error) {
                        console.log(error);
                    });
            };



            vm.numeroFacture = null;

            vm.loadFactureByNumFacture = function () {
            
                if (vm.numeroFacture)
                    FetchData.getData(API_URL + 'api/facture/'+vm.numeroFacture+'/factures-non-solde', vm.onSuccess)
                    .then(function (response) {
                        console.log(response);
                        vm.factures = response.data;
                        vm.totalElements = response.data.totalElements;
                        vm.totalPage = response.data.totalPages;

                        console.log('nombre d\'élément ' + vm.totalElements);
                        console.log('nombre de page ' + vm.totalPage);
                        // console.log("OUUHHH "+vm.bonDeSortie.numero);
                    }, function (error) {
                        console.log(error);
                    });
            };



            vm.options = {};
            vm.toggleMin = function() {
                console.log("toggleMin");
                vm.options.maxDate = vm.options.maxDate ? null : new Date();
            };
    
            vm.toggleMin();


            vm.links = null;
            vm.totalItems = null;
            vm.queryCount = null;
            vm.page = null;
            

            vm.onSuccess = function (data, status, headers, config) {
                console.log("onSuccess @@@@@@@@ BOMM", data, status, headers, config);
                console.log("onSuccess §§§§§§§", headers('X-Total-Count'));
                // vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.page = vm.currentPage+1;

                vm.totalElements = vm.totalItems;
                // // vm.totalPage = vm.totalItems;

                console.log('onSuccess nombre d\'élément BOMM ' + vm.totalElements);
                console.log('onSuccess nombre de page  BOMM' + vm.totalPage);
            }



    }
})();
