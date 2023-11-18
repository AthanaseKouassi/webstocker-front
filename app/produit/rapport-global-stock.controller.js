(function() {
    'use strict';

    angular
        .module('app')
        .controller('RapportGlobalStockControlleur', RapportGlobalStockControlleur);

    RapportGlobalStockControlleur.$inject = ['$rootScope','$scope', '$state', 'Produit', 'ProduitSearch','DateUtils','API_URL'];

    function RapportGlobalStockControlleur ($rootScope,$scope, $state, Produit, ProduitSearch,DateUtils,API_URL) {
        var vm = this;
        vm.rapportData = null;
        vm.pdfContent = null;
        vm.produits = [];
        vm.loadAll = function() {
            Produit.query(function(result) {
                vm.produits = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ProduitSearch.query({query: vm.searchQuery}, function(result) {
                vm.produits = result;
            });
        };
        vm.loadAll();
        
        vm.afficherEtat = function(){
            console.log("Etat global ********");
            console.log("La date debut "+vm.rapportData.dateDebut);
            console.log("La date fin "+vm.rapportData.dateFin);
            
            vm.pdfContent = API_URL+'api/report/etatstockglobal/etatstockglobalaimas/vm.rapportData.dateDebut/vm.rapportData.dateFin';
            $rootScope.etatStockGlobalUrl = API_URL+'api/report/etatstockglobal/etatstockglobalaimas/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateDebut)+'/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateFin) ;
            
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/etatstockglobal/etatstockglobalaimas/vm.rapportData.dateDebut/vm.rapportData.dateFin';
//            $rootScope.etatStockGlobalUrl = 'http://83.166.138.228:8080/api/report/etatstockglobal/etatstockglobalaimas/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateDebut)+'/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateFin) ;
       
//            vm.pdfContent = 'http://localhost:8080/api/report/etatstockglobal/etatstockglobalaimas/vm.rapportData.dateDebut/vm.rapportData.dateFin';
//            $rootScope.etatStockGlobalUrl = 'http://localhost:8080/api/report/etatstockglobal/etatstockglobalaimas/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateDebut)+'/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateFin) ;
            console.log('url finale '+$rootScope.etatStockGlobalUrl);
            $state.go('rapport-stock-global-pdf');
        };
        
        
        
         vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebut = false;
        vm.datePickerOpenStatus.dateFin = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
        
    }
})();
