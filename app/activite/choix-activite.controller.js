(function() {
    'use strict';

    angular
        .module('app')
        .controller('ChoixActiviteController', ChoixActiviteController);

    ChoixActiviteController.$inject = ['$rootScope','$scope', '$state','entity', 'RapportDelegueService','DateUtils','API_URL'];

    function ChoixActiviteController ($rootScope, $scope, $state, entity, RapportDelegueService, DateUtils,API_URL) {
        var vm = this;
        vm.rapportData = entity;
        vm.pdfContent = null;
        
       $scope.rapportDelegueUrl = 'activite/rapport-delegues.html';
       
       
       vm.afficherRapportDelegues = function () {
            console.log("************************************************************");
            console.log("cherchons ensemble");
            console.log(vm.rapportData);
            console.log("************************************************************");
            var d = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            console.log('Convertissons la date' + d);
            vm.pdfContent = API_URL+'api/report/bondesortie/quantiteproduitvenduedansuneville/vm.rapportData.libelle/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.rapportDelegueUrl = API_URL+'api/report/bondesortie/quantiteproduitvenduedansuneville/' + vm.rapportData.ville.libelle + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/bondesortie/quantiteproduitvenduedansuneville/vm.rapportData.libelle/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//            $rootScope.rapportDelegueUrl = 'http://83.166.138.228:8080/api/report/bondesortie/quantiteproduitvenduedansuneville/' + vm.rapportData.ville.libelle + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            
           
           
//            vm.pdfContent = 'http://localhost:8080/api/report/bondesortie/quantiteproduitvenduedansuneville/vm.rapportData.libelle/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//            $rootScope.rapportDelegueUrl = 'http://localhost:8080/api/report/bondesortie/quantiteproduitvenduedansuneville/' + vm.rapportData.ville.libelle + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            console.log('url finale ' + $rootScope.rapportDelegueUrl);
            $state.go('rapport-delegues-pdf');
        };
       
       
       
        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebutMois = false;
        vm.datePickerOpenStatus.dateFinMois = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
       
    }
})();
