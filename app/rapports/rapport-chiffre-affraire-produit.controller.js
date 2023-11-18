(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChiffreAffaireProduitController', ChiffreAffaireProduitController);

    ChiffreAffaireProduitController.$inject = ['$rootScope','$scope', '$state','API_URL', '$stateParams','RapportVenteService','Produit','entity','DateUtils'];

    function ChiffreAffaireProduitController($rootScope,$scope, $state,API_URL, $stateParams, RapportVenteService,Produit, entity,DateUtils) {
        var vm = this;
        
        vm.rapportData = entity;
        vm.produits = Produit.query();
        vm.pdfContent = null;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };
        
        vm.validerImprimer = function(){
            console.log("Lancer impression");
            vm.pdfContent = API_URL+'api/report/lignebondesorties/chiffreaffaireparproduit/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode}';
            $rootScope.etatChiffreAffaireUrl = API_URL+'api/report/lignebondesorties/chiffreaffaireparproduit/';
            
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireparproduit/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode}';
//            $rootScope.etatChiffreAffaireUrl = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireparproduit/';
          
          
//            vm.pdfContent = 'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireparproduit/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode}';
//            $rootScope.etatChiffreAffaireUrl = 'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireparproduit/';
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebut = false;
        vm.datePickerOpenStatus.dateFin = false;
//        vm.datePickerOpenStatus.datePeremption = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
