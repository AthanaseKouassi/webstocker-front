(function () {
    'use strict';

    angular
            .module('app')
            .controller('CommandeLivraisonController', CommandeLivraisonController);

    CommandeLivraisonController.$inject = ['$rootScope', '$scope', 'API_URL','$state', '$window', '$stateParams', '$location', 'entity', 'lignelivraisonEntity', 'CommandesLivraison', 'commandeLivraisonEntity', 'Commande', 'Magasin', 'Fabricant', 'Produit', 'Lignecommande'];

    function CommandeLivraisonController($rootScope, $scope, API_URL,$state, $window, $stateParams, $location, entity, lignelivraisonEntity, CommandesLivraison, commandeLivraisonEntity, Commande, Magasin, Fabricant, Produit, Lignecommande) {
        var vm = this;
        console.log("inside");
        console.log(CommandesLivraison);
        console.log("ok inside");
        vm.ligneCommandeIndex = 0;
        vm.livraison = entity;
        
        vm.commandeLivraison = commandeLivraisonEntity;
        vm.lignelivraison = lignelivraisonEntity;
        vm.commandes = Commande.queryCommandeEnCours();
        vm.lignelivraisons = [];
        vm.magasins = Magasin.query();
        vm.fabricants = Fabricant.query();
        vm.produits = Produit.query();
        // vm.load = function (id) {
        //     Commande.get({id: id}, function (result) {
        //         vm.commande = result;
        //     });
        // };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:livraisonUpdate', result);
            // $uibModalInstance.close(result);
            console.log(result);
            vm.commande = result;
            vm.isSaving = false;
            $rootScope.livraisonUrl = API_URL+'api/report/lignelivraisons/bordereauReception/' + result.id;
                       
//            $rootScope.livraisonUrl = 'http://83.166.138.228:8080/api/report/lignelivraisons/bordereauReception/' + result.id;
//            $rootScope.livraisonUrl = 'http://localhost:8080/api/report/lignelivraisons/bordereauReception/' + result.id;

            console.log("url du pdf ok");
            console.log($rootScope.livraisonUrl);
            //$state.go("livraison");
            $state.go("reception-livraison-report");
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.addLigneCommande = function () {
            vm.lignelivraison.quantiteLotLivre = vm.lignelivraison.lot.quantiteLot;
            vm.lignelivraison.lot.produit = vm.produit;
            vm.lignelivraisons[vm.ligneCommandeIndex] = vm.lignelivraison;
            vm.ligneCommandeIndex = vm.ligneCommandeIndex + 1;
            vm.lignelivraison = null;
        };

        vm.calculMaxQuantite = function () {

            console.log(vm.livraison);
            if (vm.livraison == null || vm.livraison.commande == null) {
                return 0;
            }

            vm.qteCommande = vm.quantiteRestante;
            vm.qteLignesCommande = 0;

            for (var i = 0; i < vm.lignelivraisons.length; i++) {
                vm.ligneCommandeTmp = vm.lignelivraisons[i];
                vm.qteLignesCommande = vm.qteLignesCommande + vm.ligneCommandeTmp.quantiteLotLivre;
            }
                      
            return (vm.qteCommande - vm.qteLignesCommande);

        };

        $scope.maxqte ='';
        $scope.maxqte = vm.calculMaxQuantite();

        vm.qteCommandeRestanteText = "quantite restante à traiter ";
        $scope.qteCommandeRestantePlaceholder = "";

        $scope.$watch('vm.quantiteRestante', function (newValue) {
            console.log("nouveau quantite commande");
            console.log(newValue);
            if (newValue != null) {
                $scope.maxqte = vm.calculMaxQuantite();
                $scope.qteCommandeRestantePlaceholder = vm.qteCommandeRestanteText + " : " + $scope.maxqte;
                console.log($scope.qteCommandeRestantePlaceholder);
            }
        }, true);

        $scope.$watch('vm.lignelivraison.lot.quantiteLot', function (newValue) {
            console.log("nouveau quantite commande");
            console.log(newValue);
            if (newValue != null) {
                $scope.maxqte = vm.calculMaxQuantite();
                $scope.qteCommandeRestantePlaceholder = vm.qteCommandeRestanteText + " : " + $scope.maxqte;
                console.log($scope.qteCommandeRestantePlaceholder);
            }
        }, true);

        $scope.$watch('vm.lignelivraisons', function (newValue) {
            console.log("nouveau lignes commandes");
            console.log(newValue);
            if (newValue != null) {
                $scope.maxqte = vm.calculMaxQuantite();
                $scope.qteCommandeRestantePlaceholder = vm.qteCommandeRestanteText + " : " + $scope.maxqte;

                // vm.commande.dateCommande = DateUtils.convertLocalDateToServer(vm.commande.dateCommande);
            }
        }, true);


        $scope.$watch('vm.livraison.commande', function (newValue) {
            console.log("nouveau quantite commande");
            console.log(newValue);
            if (newValue != null) {
                // vm.commande
                Lignecommande.getByCommande({id: vm.livraison.commande.id}, function (result) {
                    vm.ligneCommande = result;
                    vm.produit = vm.ligneCommande.produit;
                });
                Commande.queryQuantiteRestanteAlivrer({id: vm.livraison.commande.id}, function (result) {
                    vm.quantiteRestante = result.quantiteRestanteAlivrer;
                    console.log(result);
                    // console.log(JSON.parse(result))
                });
                // TODO recuperer le produit via les lignes de commande
            }
        }, true);



        $scope.choixDevise = {
            devise: [
                {
                    'id': "1",
                    'label': "EURO",
                    'taux': "656"
                },
                {
                    'id': "2",
                    'label': "DOLLAR USD",
                    'taux': "620"
                }
            ],
            monChoix: {}
        };
//
//        vm.valeurEnDevise;
//
//
//        $scope.conversion = function (valeur) {
//            if ($scope.choixDevise.monChoix.id == 1) {
//                $scope.result = valeur * 656;
//            } else {
//                $scope.result = valeur * 620;
//            }
//            console.log("ahhhhhh la resultat  " + $scope.result);
//            return $scope.result;
//        };
//
//        $scope.$watch('choixDevise.monChoix', function (newValue) {
//            console.log("La valeur de mon choix");
//            console.log(newValue);
//            if (newValue != null) {
//                vm.livraison.valeurLivraison = $scope.conversion(vm.valeurEnDevise);
//                console.log($scope.conversion(vm.valeurEnDevise));
//                console.log(" ohh "+ vm.livraison.valeurLivraison);
//                //$scope.result = $scope.valeurEnDevise;
//            }
//        }, true);




        vm.removeLigneCommande = function (item) {
            console.log(item);
            var index = vm.lignelivraisons.indexOf(item);
            vm.lignelivraisons.splice(index, 1);
            console.log(vm.ligneCommandeIndex);
            if (vm.ligneCommandeIndex >= 1) {
                vm.ligneCommandeIndex = vm.ligneCommandeIndex - 1;
            }
        };




        // vm.save = function () {
        //     // vm.commande.lignelivraisons=vm.lignelivraisons;
        //     vm.isSaving = true;
        //     if (vm.commande.id !== null) {
        //         Commande.update(vm.commande, onSaveSuccess, onSaveError);
        //     } else {
        //         Commande.save(vm.commande, onSaveSuccess, onSaveError);
        //     }
        // };
        vm.saveCommandeLivraison = function () {

            vm.commandeLivraison.livraison = vm.livraison;
            vm.commandeLivraison.lignelivraisons = vm.lignelivraisons;
            // vm.commande.lignelivraisons=vm.lignelivraisons;
            vm.isSaving = true;
            // if (vm.commande.id !== null) {
            //     Commande.update(vm.commande, onSaveSuccess, onSaveError);
            // } else {

            console.log(vm.commandeLivraison);
            CommandesLivraison.saveUnLivraison(vm.commandeLivraison, onSaveSuccess, onSaveError);
            console.log("apres save");
            // }
        };

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateLivraison = false;
        vm.datePickerOpenStatus.dateFabrication = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
