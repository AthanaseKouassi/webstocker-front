(function () {
    'use strict';

    angular
            .module('app')
            .controller('TransfertClientController', TransfertClientController)
            .value('URL_USERS', 'api/users/aimas');

    TransfertClientController.$inject = ['$rootScope', '$scope', '$state', '$window', 'API_URL', '$stateParams', '$location', 'entity', 'lignecommandeEntity', 'CommandeFournisseur', 'venteClientEntity', 'TransfertClient', 'Lignecommande', 'User', 'Magasin', 'Produit', 'StockOperation', 'URL_USERS', 'FetchData'];

    function TransfertClientController($rootScope, $scope, $state, $window, API_URL, $stateParams, $location, entity, lignecommandeEntity, CommandeFournisseur, venteClientEntity, TransfertClient, Lignecommande, User, Magasin, Produit, StockOperation, URL_USERS, FetchData) {
        var vm = this;

        vm.venteClientEntity = venteClientEntity;
        vm.ligneCommandeIndex = 0;
        vm.bonDeSortie = entity;
        vm.demandeur = null;
        vm.lignecommande = lignecommandeEntity;
        // vm.livraisons = Livraison.query();
        vm.lignecommandes = [];
        vm.magasins = Magasin.query();
        console.log(vm.magasins);
        vm.fabricants = null;
        vm.users = User.query();
        vm.produits = Produit.query();
        vm.produitCommande = null;
        vm.sortieWrappers = null;
        vm.userAimas = null;


        var onSaveSuccess = function (result) {
            $scope.$emit('app:commandeUpdate', result);
            // $uibModalInstance.close(result);
            console.log(result);
            vm.bonDeSortie = result;
            vm.isSaving = false;
            $rootScope.transfertUrl = API_URL + 'api/report/lignebondesorties/bondesortietransfert/' + result.id;
            console.log("url du pdf ok");
            console.log($rootScope.transfertUrl);
            $state.go("transfert-produit-report");
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.addLigneCommande = function () {
            vm.lignecommande.produit = vm.produitCommande;

            StockOperation.getSortieWrapper({id: vm.lignecommande.produit.id, quantite: vm.lignecommande.quantite}, function (result) {

                for (var i = 0; i < result.length; i++) {
                    result[i].prixVente = vm.lignecommande.prixVente;
                    console.log("premier");
                }

                if (vm.sortieWrappers) {
                    console.log("deuxieme");
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        var resultat = result[i];
                        var isIn = false;
                        for (var j = 0; j < vm.sortieWrappers.length; j++) {
                            var elt = vm.sortieWrappers[j];
                            if (elt.produit.id === resultat.produit.id) {
                                isIn = true;
                                break;
                            }

                        }
                        console.log("isin " + isIn);
                        if (!isIn) {
                            vm.sortieWrappers.push(resultat);
                        }

                    }
                    console.log(vm.sortieWrappers);

                } else {
                    console.log("result");
                    vm.sortieWrappers = result;

                    console.log(vm.sortieWrappers);
                }

                // vm.sortieWrappers=result;

                // for (var i=0;i<vm.sortieWrappers.length;i++){
                //     vm.sortieWrappers[i].prixVente=vm.lignecommande.prixVente;
                // }

                vm.ligneCommandeIndex = vm.sortieWrappers.length;
                vm.clear();

            });

        };


        $scope.maxStockProduit = 0;

        vm.qteStockProduitDisponibleText = "quantite produit disponible ";
        $scope.qteStockProduitDisponiblePlaceholder = "";

        $scope.$watch('vm.produitCommande', function (newValue) {
            console.log("nouveau produit commande");
            console.log(newValue);
            if (newValue != null) {
                StockOperation.getQuantiteDispoParMagasin({id: vm.produitCommande.id, magasinID: vm.bonDeSortie.magasin.id}, function (result) {
                    vm.quantiteStockProduit = result.quantiteStockProduit;
                    console.log(vm.quantiteStockProduit);


                    $scope.maxStockProduit = vm.quantiteStockProduit;
                    $scope.qteStockProduitDisponiblePlaceholder = vm.qteStockProduitDisponibleText + " " + $scope.maxStockProduit;

                });

                console.log("valeur qte " + vm.quantiteStockProduit);

            }
        }, true);


        vm.removeLigneCommande = function (item) {
            console.log(item);
            vm.sortieWrappers.splice(vm.sortieWrappers.indexOf(item), 1)
            // vm.sortieWrappers=[];
            vm.ligneCommandeIndex = vm.sortieWrappers.length;

        };


        $scope.button_clicked = false;
        vm.saveCommandeFournisseur = function () {

            vm.venteClientEntity.bonDeSortie = vm.bonDeSortie;
            vm.venteClientEntity.ligneBonDeSorties = vm.lignecommandes;

            var data = {
                numero: vm.bonDeSortie.numero,
                daateCreation: vm.bonDeSortie.daateCreation,
                typeSortie: vm.bonDeSortie.typeSortie,
                typeVente: vm.bonDeSortie.typeVente,
                client: vm.bonDeSortie.client,
                demandeur: vm.bonDeSortie.demandeur,
                magasin: vm.bonDeSortie.magasin,
                destination: vm.bonDeSortie.destination,
                id: null,
                ligneBonDeSorties: vm.sortieWrappers

            };

            vm.isSaving = true;

            console.log(data);

            TransfertClient.saveTransfertClient({}, data, onSaveSuccess, onSaveError);
            console.log("apres save");
            $scope.button_clicked = true;

        };

        FetchData.getData(API_URL + URL_USERS).then(function (response) {
            console.log(response);
            vm.userAimas = response.data;
        }, function (error) {
            console.log(error);
        });
        vm.clear = function () {

            vm.lignecommande.prixVente = null;
            vm.lignecommande.produit = null;
            vm.lignecommande.quantite = null;
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateCommande = false;
        vm.datePickerOpenStatus.dateFabrication = false;
        vm.datePickerOpenStatus.datePeremption = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
