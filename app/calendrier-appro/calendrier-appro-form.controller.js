(function() {
    'use strict';

    angular
        .module('app')
        .controller('CalendrierApproControllerForm', CalendrierApproControllerForm);
 /*'Lignefacture', 'LignefactureSearch'*/
 CalendrierApproControllerForm.$inject = ['$scope', '$state', 'FetchData', 'API_URL', '$stateParams', 'AuthServerProvider', 'DateUtils', 'Inventaire', '$filter'];

        /*Lignefacture, LignefactureSearch*/
    function CalendrierApproControllerForm ($scope, $state, FetchData, API_URL, $stateParams, AuthServerProvider, DateUtils, Inventaire, $filter) {

        var vm = this;
        vm.inventaire = {};
        vm.produits = [];
        vm.produit = {};
        vm.bailleurs = [];
        vm.bailleur = {};
        vm.id = $stateParams.id;
        vm.dateDebut = "";
        vm.isSaving = false;
        var authToken = AuthServerProvider.getToken();
        vm.loadAll = function() {
            console.log("IDDDDD:", vm.id);
   
            
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
                    console.log("Inventaire by id");
                    vm.inventaire = response.data;
                    vm.inventaire.dateInventaire = DateUtils.convertLocalDateFromServer(vm.inventaire.dateInventaire)
                    vm.bailleur = vm.inventaire.bailleur;
                    vm.produit = vm.inventaire.produit;

                    vm.changeProduit();
                }, function (error) {
                    console.log(error);
                });

        };


        vm.changeProduit = function () {
            if (vm.produit.id && vm.inventaire.dateInventaire) {

                var dateInventaireBackup = vm.inventaire.dateInventaire;
                var dateFormat = 'yyyy-MM-dd';
                var searchQuery = $filter('date')(vm.inventaire.dateInventaire, dateFormat);

                FetchData.getData(API_URL + 'api/inventaire/'+vm.produit.id+'/quantite-theorique-en-stock?dateInventaire='+searchQuery)
                .then(function (response) {
                    vm.inventaire = response.data;
                    vm.inventaire.dateInventaire = dateInventaireBackup;

                    if (vm.inventaire.id) {
                        FetchData.getData(API_URL + 'api/inventaires/'+ vm.inventaire.id+'/ajustement')
                            .then(function (response) {
                                // vm.inventaire.ajustement = response.data.ajustement;
                                vm.inventaire = response.data;
                                vm.inventaire.dateInventaire = dateInventaireBackup;
                            }, function (error) {
                                console.log(error);
                            });
                    }
                }, function (error) {
                    console.log(error);
                });
                
            }
        }

        vm.exportExcel = function () {
            var dateFormat = 'yyyy-MM-dd';
            var searchQuery = $filter('date')(vm.inventaire.dateInventaire, dateFormat);
            var url = API_URL + 'api/report/inventaires/calendrier-approvisionnement/'+searchQuery /* + '?access_token=' + authToken*/;
            window.open(url);
        }

        vm.exportPDF = function () {
            var dateFormat = 'yyyy-MM-dd';
            var searchQuery = $filter('date')(vm.inventaire.dateInventaire, dateFormat);
            var url = API_URL + 'api/report/inventaires/calendrier-approvisionnement/'+searchQuery/* + '?access_token=' + authToken*/;
            window.open(url);
        }

        vm.createInventaire = () => {
            // 'api/inventaires/' + vm.inventaire)
            vm.isSaving = true;
            const data = vm.inventaire;
            Inventaire.update({}, data, onSaveSuccess, onSaveError);
        }



        var onSaveSuccess = function (result) {
            $scope.$emit('app:commandeUpdate', result);
            // $uibModalInstance.close(result);
            console.log("SAVE INVENTAIRE", result);

            
            vm.inventaire = result;
            vm.bailleur = vm.inventaire.bailleur;
            vm.produit = vm.inventaire.produit;
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };




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
        


        vm.options = {
            maxDate: new Date(),
        };

    }


})();
