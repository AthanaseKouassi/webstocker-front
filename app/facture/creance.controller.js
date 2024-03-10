(function () {
    'use strict';

    angular
            .module('app')
            .controller('CreanceController', CreanceController);

    CreanceController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'AlertService', '$stateParams', 'API_URL', 'FetchData','BonDeSortie'];

    function CreanceController($scope, $rootScope, $state,$filter,AlertService, $stateParams, API_URL, FetchData,BonDeSortie) {
        var vm = this;
         vm.bonDeSorties = {}; //BonDeSortie.query();
         vm.bonDeSortie = [];
         vm.creances = [];

        vm.currentPage = 0;
        vm.pageSize = 999999999;
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
            vm.loadAllPage();
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





            vm.categorieCreance = null;

            vm.allCreancesByCategorie = function () {
            
                if (vm.categorieCreance)
                    FetchData.getData(API_URL + 'api/facture/'+vm.categorieCreance+'/categorie-creance')
                    .then(function (response) {
                        console.log(response);
                        vm.creances = response.data;
                        vm.totalElements = response.data.totalElements;
                        vm.totalPage = response.data.totalPages;

                        console.log('nombre d\'élément ' + vm.totalElements);
                        console.log('nombre de page ' + vm.totalPage);
                        // console.log("OUUHHH "+vm.bonDeSortie.numero);
                    }, function (error) {
                        console.log(error);
                    });
            };



            vm.sommeTotal = function() {
                return vm.creances.map(cr => cr.resteApayer).reduce((a, b) => Number(a) + Number(b), 0);
            }

                                
        vm.imprimerParCategorie = function(){
            $rootScope.imprimerParCategorieUrl = API_URL + 'api/report/categorie-creance/'+vm.categorieCreance;
            console.log('url finale ' + $rootScope.imprimerParCategorieUrl);
            $state.go('creance-pdf');
        };
 



    }
})();
