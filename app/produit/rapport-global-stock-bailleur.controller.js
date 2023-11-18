(function () {
    'use strict';

    angular
            .module('app')
            .controller('RapportGlobalStockBailleurController', RapportGlobalStockBailleurController);

    RapportGlobalStockBailleurController.$inject = ['$rootScope', '$scope', 'API_URL', '$state', '$stateParams', '$uibModalInstance', 'DateUtils', 'entity', 'Produit', 'Categorie', 'Fabricant', 'Lignecommande', 'Conditionnement', 'Lot', 'Bailleur'];

    function RapportGlobalStockBailleurController($rootScope, $scope,API_URL, $state, $stateParams, $uibModalInstance, DateUtils, entity, Produit, Categorie, Fabricant, Lignecommande, Conditionnement, Lot, Bailleur) {
        var vm = this;
        vm.produit = entity;
        vm.categories = Categorie.query();
        vm.fabricants = Fabricant.query();
        vm.lignecommandes = Lignecommande.query();
        vm.conditionnements = Conditionnement.query();
        vm.bailleurs = Bailleur.query();
        vm.lots = Lot.query();
        vm.dataReport = null;
        vm.pdfContent = null;

        vm.load = function (id) {
            Produit.get({id: id}, function (result) {
                vm.produit = result;
            });
        };

        vm.imprimerEtatStockBailleur = function () {
            console.log('oohhh essai **********');
            console.log("La date debut " + vm.dataReport.dateDebut);
            console.log("La date fin " + vm.dataReport.dateFin);
            vm.pdfContent =  API_URL+'api/report/etatstockglobal/etatstockglobalbailleur/vm.bailleurs.nomBailleur/vm.dataReport.dateDebut/vm.dataReport.dateFin';
            $rootScope.etatStockBailleurUrl =  API_URL+'api/report/etatstockglobal/etatstockglobalbailleur/' + vm.dataReport.bailleur.nomBailleur + '/' + DateUtils.convertLocalDateToServer(vm.dataReport.dateDebut) + '/' + DateUtils.convertLocalDateToServer(vm.dataReport.dateFin);
            
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/etatstockglobal/etatstockglobalbailleur/vm.bailleurs.nomBailleur/vm.dataReport.dateDebut/vm.dataReport.dateFin';
//            $rootScope.etatStockBailleurUrl = 'http://83.166.138.228:8080/api/report/etatstockglobal/etatstockglobalbailleur/' + vm.dataReport.bailleur.nomBailleur + '/' + DateUtils.convertLocalDateToServer(vm.dataReport.dateDebut) + '/' + DateUtils.convertLocalDateToServer(vm.dataReport.dateFin);
     
     
//            vm.pdfContent = 'http://localhost:8080/api/report/etatstockglobal/etatstockglobalbailleur/vm.bailleurs.nomBailleur/vm.dataReport.dateDebut/vm.dataReport.dateFin';
//            $rootScope.etatStockBailleurUrl = 'http://localhost:8080/api/report/etatstockglobal/etatstockglobalbailleur/' + vm.dataReport.bailleur.nomBailleur + '/' + DateUtils.convertLocalDateToServer(vm.dataReport.dateDebut) + '/' + DateUtils.convertLocalDateToServer(vm.dataReport.dateFin);
            console.log('url finale ' + $rootScope.etatStockBailleurUrl);
            $uibModalInstance.close();
            $state.go('rapport-global-stock-bailleur-pdf');
        };


        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:produitUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.produit.id !== null) {
                Produit.update(vm.produit, onSaveSuccess, onSaveError);
            } else {
                Produit.save(vm.produit, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebut = false;
        vm.datePickerOpenStatus.dateFin = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
