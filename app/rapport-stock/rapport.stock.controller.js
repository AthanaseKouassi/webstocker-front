(function () {
    'use strict';

    angular
            .module('app')
            .controller('StockMagasinController', StockMagasinController);

    StockMagasinController.$inject = ['$rootScope', '$scope', '$state','$sce', '$stateParams', 'entity', 'Magasin', 'Produit', 'RapportStock', 'DateUtils', 'API_URL'];
    function StockMagasinController($rootScope, $scope, $state, $sce, $stateParams, entity, Magasin, Produit, RapportStock, DateUtils, API_URL) {

        var vm = this;
        vm.rapportData = entity;
        vm.magasins = Magasin.query();
        vm.magasin = null;
        vm.produits = Produit.query();
        vm.produit = null;
        vm.pdfContent = null;

        $scope.valeurEtats = [
            {
                "id": 1,
                "val": "TRANSFERT",
                "label": "Rapport du stock transféré",
                "url": "rapport-stock/etat-transfert-magasin.html"
            },
            {
                "id": 2,
                "val": "VENTE",
                "label": "rapport du stock vendu",
                "url": "rapport-stock/etat-vente-magasin.html"
            },
            {
                "id": 3,
                "val": "PROMOTION",
                "label": "rapport du stock sortie en promotion",
                "url": "rapport-stock/rapport-promotion-magasin.html"
            }
        ];

        $scope.valEtat = $scope.valeurEtats;

        $scope.showMe = false;
        //$scope.showMe2 = true;

        $scope.hasChanged = function () {

            if ($scope.valEtat !== null)
            {
                switch ($scope.valEtat.id) {
                    case 1:

                        console.log($scope.valEtat.val);
                        vm.rapportData.typeSortie = $scope.valEtat.val;
                        break;
                    case 2:
                        console.log($scope.valEtat.url);
                        //$scope.showMe = !$scope.showMe ;
                        console.log($scope.valEtat.val);
                        vm.rapportData.typeSortie = $scope.valEtat.val;
                        break;
                    case 3:
                        console.log($scope.valEtat.url);
                        //$scope.showMe = !$scope.showMe ;
                        console.log($scope.valEtat.val);
                        vm.rapportData.typeSortie = $scope.valEtat.val;
                        break;
                    default :
                        console.log("VALEUR VIDE");
                        break;
                }
            }
        };

        vm.rechercher = function () {
            console.log("************************************************************");
            console.log("je cherche");
            console.log(vm.rapportData);
            console.log("************************************************************");
            var d = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            //  /report/lignebondesorties/quantitelotproduitvenduparmagasin/{typeSortie}/{nomMagasin}/{dateDebutPeriode}/{dateFinPeriode}/{produit}"
            console.log('date oh ' + d);
//            vm.pdfContent = 'http://localhost:8080/api/report/lignebondesorties/quantitevenduparmagasin/vm.rapportData.typesortie/vm.rapportData.magasin.nomMagasin/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//            $rootScope.etatStockUrl = 'http://localhost:8080/api/report/lignebondesorties/quantitevenduparmagasin/' + vm.rapportData.typeSortie + '/' + vm.rapportData.magasin.nomMagasin + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);


            vm.pdfContent = API_URL + 'api/report/lignebondesorties/quantitelotproduitvenduparmagasin/vm.rapportData.typesortie/vm.rapportData.magasin.nomMagasin/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode/vm.rapportdata.produit.nomproduit';
            $rootScope.etatStockUrl = API_URL + 'api/report/lignebondesorties/quantitelotproduitvenduparmagasin/' + vm.rapportData.typeSortie + '/' + vm.rapportData.magasin.nomMagasin + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode) + '/' + vm.rapportData.produit.nomProduit;


//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/lignebondesorties/quantitelotproduitvenduparmagasin/vm.rapportData.typesortie/vm.rapportData.magasin.nomMagasin/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode/vm.rapportdata.produit.nomproduit';
//            $rootScope.etatStockUrl = 'http://83.166.138.228:8080/api/report/lignebondesorties/quantitelotproduitvenduparmagasin/' + vm.rapportData.typeSortie + '/' + vm.rapportData.magasin.nomMagasin + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode)+'/'+vm.rapportData.produit.nomProduit;


//            vm.pdfContent = 'http://localhost:8080/api/report/lignebondesorties/quantitelotproduitvenduparmagasin/vm.rapportData.typesortie/vm.rapportData.magasin.nomMagasin/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode/vm.rapportdata.produit.nomproduit';
//            $rootScope.etatStockUrl = 'http://localhost:8080/api/report/lignebondesorties/quantitelotproduitvenduparmagasin/' + vm.rapportData.typeSortie + '/' + vm.rapportData.magasin.nomMagasin + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode)+'/'+vm.rapportData.produit.nomProduit;
            console.log('url finale ' + $rootScope.etatStockUrl);
            $state.go('rapport-stock');
            // RapportStock.etatQuantiteVendueParMagasin(vm.rapportData, onSaveSuccess, onSaveError);
        };

        var onSaveError = function () {

        };

        var onSaveSuccess = function (result) {

            console.log("*****************ok etat***************");
            console.log(result);
            console.log("*****************ok etat***************");

            $rootScope.factureUrl = result;

            console.log("url pdf oh");
            console.log($rootScope.factureUrl);
            var file = new Blob([result], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open($sce.trustAsResourceUrl(fileURL));

            console.log("*********data*****");
            console.log(result.data);
            vm.pdfContent = $sce.trustAsResourceUrl(fileURL);

            // $state.go("facture-vente");
        };
        
        $scope.button_clicked = false;

        vm.imprimerEtatstockParMagasin = function () {
            console.log(vm.rapportData);
            var dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            var dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.etatStockParMagasinUrl = API_URL+'api/report/etatdeproduitsparmagasin/'+vm.rapportData.produit.nomProduit+'/'+dateDebut+'/'+dateFin;
            console.log('url finale ' + $rootScope.etatStockParMagasinUrl);
            $state.go('rapport-stock');
           $scope.button_clicked = true;
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebut = false;
        vm.datePickerOpenStatus.dateFin = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
