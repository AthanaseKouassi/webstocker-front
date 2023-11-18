(function () {
    'use strict';

    angular
            .module('app')
            .controller('PerteClientController', PerteClientController)
            .value('URL_USERS', 'api/users/aimas');

    PerteClientController.$inject = ['$rootScope', '$scope', '$state', 'API_URL', '$window', '$stateParams', '$location', 'entity', 'lignecommandeEntity', 'CommandeFournisseur', 'venteClientEntity', 'PerteClient', 'Lignecommande', 'User', 'Magasin', 'Produit', 'StockOperation', 'FetchData','URL_USERS'];

    function PerteClientController($rootScope, $scope, $state, API_URL, $window, $stateParams, $location, entity, lignecommandeEntity, CommandeFournisseur, venteClientEntity, PerteClient, Lignecommande, User, Magasin, Produit, StockOperation, FetchData,URL_USERS) {
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

        var onSaveSuccess = function (result) {
            $scope.$emit('app:commandeUpdate', result);
            // $uibModalInstance.close(result);
            console.log(result);
            vm.bonDeSortie = result;
            vm.isSaving = false;

//            $rootScope.perteUrl='http://localhost:8080/api/report/lignebondesorties/bondesortieperte/'+result.id;
//            $rootScope.perteUrl='http://83.166.138.228:8080/api/report/lignebondesorties/bondesortieperte/'+result.id;

//            $rootScope.perteUrl= API_URL+'api/report/lignebondesorties/bondesortiepromotion/'+result.id;   
            $rootScope.perteUrl= API_URL+'api/report/lignebondesorties/bondesortieperte/'+result.id;   
            console.log("url du pdf ok");
            console.log($rootScope.perteUrl);
            $state.go("perte-produit-report");
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
//                StockOperation.getQuantiteDispo({id: vm.produitCommande.id}, function (result) {
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

            PerteClient.savePerteClient({}, data, onSaveSuccess, onSaveError);
            console.log("apres save");
            // }
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
