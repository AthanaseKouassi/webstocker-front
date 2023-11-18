(function () {
    'use strict';

    angular
        .module('app')
        .controller('CommandeFournisseurController', CommandeFournisseurController);

    CommandeFournisseurController.$inject = ['$rootScope','$scope','$state', '$stateParams', '$location', 'entity', 'lignecommandeEntity', 'CommandeFournisseur', 'commandeFournisseurEntity', 'Livraison', 'Lignecommande', 'Bailleur', 'Fabricant', 'Produit','API_URL'];

    function CommandeFournisseurController($rootScope,$scope,$state,$stateParams, $location, entity, lignecommandeEntity, CommandeFournisseur, commandeFournisseurEntity, Livraison, Lignecommande, Bailleur, Fabricant, Produit, API_URL) {
        var vm = this;
        console.log("inside");
        console.log(CommandeFournisseur);
        console.log("ok inside");
        vm.ligneCommandeIndex = 0;
        vm.commande = entity;
        vm.commandeFournisseur = commandeFournisseurEntity;
        vm.lignecommande = lignecommandeEntity;
        vm.livraisons = Livraison.query();
        vm.lignecommandes = [];
        vm.bailleurs = Bailleur.query();
        vm.fabricants = null;
        vm.produits = Produit.query();
        vm.produitCommande = null;
        // vm.load = function (id) {
        //     Commande.get({id: id}, function (result) {
        //         vm.commande = result;
        //     });
        // };

        var onSaveSuccess = function (result) {
            $scope.$emit('app:commandeUpdate', result);
            // $uibModalInstance.close(result);
            console.log(result);            
            vm.commande = result;
            vm.isSaving = false;
            
//            $rootScope.commandeUrl = 'http://localhost:8080/api/report/lignecommande/commande/' + result.id;
//            $rootScope.commandeUrl = 'http://83.166.138.228:8080/api/report/lignecommande/commande/' + result.id;

            $rootScope.commandeUrl = API_URL+'api/report/lignecommande/commande/' + result.id;

            console.log("url du pdf ok");
            console.log($rootScope.commandeUrl);
            //$state.go("livraison");
            $state.go("rapport-commande");
            
            
//            $state.go("commande");
             
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.addLigneCommande = function () {
            vm.lignecommande.produit=vm.produitCommande;
            vm.lignecommandes[vm.ligneCommandeIndex] = vm.lignecommande;
            vm.ligneCommandeIndex = vm.ligneCommandeIndex + 1;
            vm.lignecommande = null;
        };

        vm.calculMaxQuantite = function () {

            console.log(vm.commande);
            if (vm.commande == null) {
                return 0;
            }

            vm.qteCommande = vm.commande.quantiteCommande;
            vm.qteLignesCommande = 0;

            for (var i = 0; i < vm.lignecommandes.length; i++) {
                vm.ligneCommandeTmp = vm.lignecommandes[i];
                vm.qteLignesCommande = vm.qteLignesCommande + vm.ligneCommandeTmp.quantiteLigneCommande;
            }

            return (vm.qteCommande - vm.qteLignesCommande);


        };


        $scope.maxqte = vm.calculMaxQuantite();

        vm.qteCommandeRestanteText = "quantite restante à traiter ";
        $scope.qteCommandeRestantePlaceholder =

            $scope.$watch('vm.commande.quantiteCommande', function (newValue) {
                console.log("nouveau quantite commande");
                console.log(newValue);
                if (newValue != null) {
                    $scope.maxqte = vm.calculMaxQuantite();
                    $scope.qteCommandeRestantePlaceholder = vm.qteCommandeRestanteText + " : " + $scope.maxqte;
                }
            }, true);

        $scope.$watch('vm.produitCommande', function (newValue) {
            console.log("nouveau produit commande");
            console.log(newValue);
            if (newValue != null) {
                vm.fabricants =  Fabricant.getParProduit({id: vm.produitCommande.id});

            }
        }, true);

        $scope.$watch('vm.lignecommandes', function (newValue) {
            console.log("nouveau lignes commandes");
            console.log(newValue);
            if (newValue != null) {
                $scope.maxqte = vm.calculMaxQuantite();
                $scope.qteCommandeRestantePlaceholder = vm.qteCommandeRestanteText + " : " + $scope.maxqte;

                // vm.commande.dateCommande = DateUtils.convertLocalDateToServer(vm.commande.dateCommande);
            }
        }, true);


        vm.removeLigneCommande = function (item) {
            console.log(item);
            var index = vm.lignecommandes.indexOf(item);
            vm.lignecommandes.splice(index, 1);
            console.log(vm.ligneCommandeIndex);
            if (vm.ligneCommandeIndex >= 1) {
                vm.ligneCommandeIndex = vm.ligneCommandeIndex - 1;
            }
        };

        // vm.save = function () {
        //     // vm.commande.lignecommandes=vm.lignecommandes;
        //     vm.isSaving = true;
        //     if (vm.commande.id !== null) {
        //         Commande.update(vm.commande, onSaveSuccess, onSaveError);
        //     } else {
        //         Commande.save(vm.commande, onSaveSuccess, onSaveError);
        //     }
        // };
        vm.saveCommandeFournisseur = function () {

            vm.commande.produit=vm.produitCommande;
            vm.commandeFournisseur.commande = vm.commande;
            vm.commandeFournisseur.lignecommandes = vm.lignecommandes;
            // vm.commande.lignecommandes=vm.lignecommandes;
            vm.isSaving = true;
            // if (vm.commande.id !== null) {
            //     Commande.update(vm.commande, onSaveSuccess, onSaveError);
            // } else {

            console.log(vm.commandeFournisseur);
            CommandeFournisseur.saveUnFournisseur(vm.commandeFournisseur, onSaveSuccess, onSaveError);
            console.log("apres save");
            // }
        };

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
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
